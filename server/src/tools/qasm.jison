/**************************************************
 * Lexical Grammar
 **************************************************/
%lex
%%

"//".*                  /* skip comments */
\s+                     /* skip whitespace */ // ??
[0-9]+("."[0-9]+)\b     return 'REAL'
[-]?[0-9]+              return 'INT'
"IBMQASM"               return 'IBMQASM'
"OPENQASM"              return 'IBMQASM'
"include"               return 'include'
"\"qelib1.inc\""        return 'QELIB.INC'
"qreg"                  return 'QREG'
"creg"                  return 'CREG'
"CX"                    return 'CX'
"U"                     return 'U'
"measure"               return 'MEASURE'
"barrier"               return 'BARRIER'
"reset"                 return 'RESET'
"opaque"                return 'OPAQUE'
"->"                    return '->'
";"                     return ';'
","                     return ','
"("                     return '('
")"                     return ')'
"{"                     return '{'
"}"                     return '}'
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"gate"                  return 'GATE'
"pi"                    return 'PI'
// "theta"                 return 'THETA'
// "phi"                   return 'PHI'
// "lambda"                return 'LAMBDA'
[a-z][a-zA-Z0-9]{0,30}\b return 'ID'
"["                     return '['
"]"	                    return ']'
<<EOF>>                 return 'EOF'

/lex

%left '+' '-'
%left '*' '/'
%left '^'

/**************************************************
 * HELPERS
 **************************************************/
%{

var errors = [];

function toParserLocation(location) {
    return {
        firstLine: location.first_line,
        lastLine: location.last_line,
        firstColumn: location.first_column,
        lastColumn: location.last_column
    };
}

function buildNonTerminalNode(type, childs) {
    return {
        type: type,
        terminal: false,
        childs: childs
    };
}

function buildTerminalNode(type, value, location) {
    return {
        type: type,
        terminal: true,
        value: value, 
        location: toParserLocation(location)
    };
}

function buildMainProgramNode(...childs) {
    return buildNonTerminalNode('MAIN-PROGRAM', childs);
}

function buildIbmDefinitionNode(...childs) {
    return buildNonTerminalNode('IBM-DEFINITION', childs);
}

function buildQregDeclarationNode(...childs) {
    return buildNonTerminalNode('QREG-DECLARATION', childs);
}

function buildCregDeclarationNode(...childs) {
    return buildNonTerminalNode('CREG-DECLARATION', childs);
}

function buildGateDeclarationNode(...childs) {
    return buildNonTerminalNode('GATE-DECLARATION', childs);
}

function buildGateListNode(...childs) {
    return buildNonTerminalNode('GATE-LIST', childs);
}

function buildGateNode(...childs) {
    return buildNonTerminalNode('GATE', childs);
}

function buildBitListNode(...childs) {
    return buildNonTerminalNode('BIT-LIST', childs);
}

function buildBitNode(...childs) {
    return buildNonTerminalNode('BIT', childs);
}

function buildProgramNode(...childs) {
    return buildNonTerminalNode('PROGRAM', childs);
}

function buildStatementNode(...childs) {
    return buildNonTerminalNode('STATEMENT', childs);
}

function buildDeclarationNode(...childs) {
    return buildNonTerminalNode('DECLARATION', childs);
}

function buildOpaqueNode(...childs) {
    return buildNonTerminalNode('OPAQUE', childs);
}

function buildIbmQasmNode(value, location) {
    return buildTerminalNode('IBMQASM', value, location);
}

function buildRealNode(value, location) {
    return buildTerminalNode('REAL', value, location);
}

function buildIncludeNode(value, location) {
    return buildTerminalNode('INCLUDE', value, location);
}

function buildIdentifierNode(value, location) {
    return buildTerminalNode('ID', value, location);
}

function buildIntegerNode(value, location) {
    return buildTerminalNode('INT', value, location);
}

parser.parseError = function parseError(message, hash) {
    errors.push({
        message: message,
        location: toParserLocation(hash.loc)
    });
};

parser.init = function init() {
    errors = [];
};
%}
/**************************************************
 * Grammar
 **************************************************/
%start StartProgram

%parse-param qelibParsed

%% /* language grammar */

StartProgram
    : MainProgram EOF 
    {
        return {
            asm: $1,
            errors: errors
        } 
    }
    ;

MainProgram
    : IbmDefinition { $$ = buildMainProgramNode($1); }
    | IbmDefinition Program { $$ = buildMainProgramNode($1, $2); }
    | Library { $$ = buildMainProgramNode($1); }
    ;

IbmDefinition
    : IBMQASM REAL ';' Include 
    { 
        $$ = buildIbmDefinitionNode(
            buildIbmQasmNode($1, @1),
            buildRealNode($2, @2),
            $4); 
    }
    | IBMQASM REAL ';' 
    { 
        $$ = buildIbmDefinitionNode(
            buildIbmQasmNode($1, @1),
            buildRealNode($2, @2)); 
    } 
    ;

Include
    : 'include' 'QELIB.INC' ';' { $$ = buildIncludeNode($2, @2); } // TODO: Support include in parser
    ;

Library
    : Declaration { $$ = $1; }
    | Library Declaration 
      { 
        $$ = $Library; 
        $$.push($Declaration);
      }
    ;

Program
    : Statement { $$ = buildProgramNode($1); }
    | error Statement { $$ = buildProgramNode($2); }
    | Program Statement { $$ = buildProgramNode($1, $2); }
    | Program error Statement { $$ = buildProgramNode($1, $3); }
    ;

Statement
    : Declaration { $$ = $1; }
    | QOperation ';'
    | Magic ';'
    // TODO: The user can define its own gates
    // | GateDefinition { console.log('Definition: %j', $1); }
    ;

Declaration
    : QRegDeclaration { $$ = $1; }
    | CRegDeclaration { $$ = $1; }
    | GateDeclaration { $$ = $1; }
    ;

QRegDeclaration
    : QREG ID '[' INT ']' ';' 
    {
        $$ = buildQregDeclarationNode(
            buildIdentifierNode($2, @2),
            buildIntegerNode($4, @4)
        );
    }
    ;

CRegDeclaration
    : CREG ID '[' INT ']' ';' 
    {
        $$ = buildCregDeclarationNode(
            buildIdentifierNode($2, @2),
            buildIntegerNode($4, @4)
        );
    }
    ;

GateDeclaration
    : GATE Id GateScope BitList GateBody { $$ = buildGateDeclarationNode($1, $2, $4, $5); }
    | GATE Id GateScope '(' ')' BitList GateBody { $$ = buildGateDeclarationNode($1, $2, $6, $7); }
    | GATE Id GateScope '(' GateIdList ')' BitList GateBody  { $$ = buildGateDeclarationNode($1, $2, $5, $7, $8); }
    ;

GateIdList
    : Gate { $$ = buildGateNode($1); }
    | GateIdList ',' Gate { $$ = buildGateListNode($1, $3); }
    ;

Gate
    : Id { $$ = buildIdentifierNode($1, @1); }
    ;

    // TODO: empty in the source ???
GateScope
    :
    ;

BitList
    : Bit { $$ = buildBitNode($1); }
    | BitList ',' Bit { $$ = buildBitListNode($1, $3); }
    ;

Bit
    : Id
    ;

GateBody
    : '{' GateOpList '}' 
    | '{' '}'
    ;

GateOpList
    : GateOp 
    | GateOpList GateOp
    ;

GateOp
    : U '(' ExpList ')' Id ';' 
    | CX Id ',' Id ';' 
    | Id IdList ';' 
    | Id '(' ')' IdList ';' 
    | Id '(' ExpList ')' IdList ';'
    | BARRIER IdList ';' 
    ;

ExpList
    : Expression 
    | ExpList ',' Expression
    ;

Expression
    : MultiplicativeExpression
    | Expression '^' MultiplicativeExpression 
    ;

MultiplicativeExpression
    : AdditiveExpression
    | MultiplicativeExpression '*' MultiplicativeExpression 
    | MultiplicativeExpression '/' MultiplicativeExpression 
    ;

AdditiveExpression
    : PrefixExpression
    | AdditiveExpression '+' AdditiveExpression 
    | AdditiveExpression '-' AdditiveExpression 
    ;

PrefixExpression
    : Unary
    | '+' PrefixExpression 
    | '-' PrefixExpression 
    ;

Unary
    : INT
    | REAL
    | PI
    | Id
    | '(' Expression ')'
    // | Id '(' Expression ')'
    | Id '(' Expression ')'
    ;

QOperation
    : UnitaryOperation
    | Opaque
    | Measure
    | Barrier
    | Reset
    // | if
    ;

UnitaryOperation
    : U '(' ExprList ')' Primary ';' 
    | CX Primary ',' Primary 
    | Id PrimaryList 
    | Id '(' ')' PrimaryList 
    | Id '(' ExpressionList ')' PrimaryList 
    ;


Primary
    : Id 
    | IndexedId
    ;

Id
    : ID { $$ = buildIdentifierNode($1, @1); } 
    ;

PrimaryList
    : Primary 
    | PrimaryList ',' Primary
    ;

IndexedId
    : ID '[' INT ']'
    ;

Barrier
    : BARRIER PrimaryList 
    ;

Measure
    : MEASURE Primary '->' Primary 
    ;

IdList
    : Id 
    | IdList ',' Id
    ;

Reset
    : RESET Primary 
    ;

Opaque
    : OPAQUE Id GateScope BitList { $$ = buildOpaqueNode($2, $4); }
    | OPAQUE Id GateScope '(' ')' BitList { $$ = buildOpaqueNode($2, $6); }
    | OPAQUE Id GateScope '(' GateIdList ')' BitList { $$ = buildOpaqueNode($2, $5, $7); }
    ;
