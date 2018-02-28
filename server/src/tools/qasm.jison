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

function buildNonTerminalNode(type, ...childs) {
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

function buildCompilationResult(asmRootNode) {
    return {
        asm: asmRootNode,
        errors: errors
    };
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
    : MainProgram EOF { return buildCompilationResult(buildNonTerminalNode('PROGRAM', $1)); }
    ;

MainProgram
    : IbmDefinition { $$ = buildNonTerminalNode('MAIN-PROGRAM', $1); }
    | IbmDefinition Program { $$ = buildNonTerminalNode('MAIN-PROGRAM', $1, $2); }
    | Library { $$ = buildNonTerminalNode('MAIN-PROGRAM', $1); }
    ;

IbmDefinition
    : IBMQASM REAL ';' Include 
    { 
        $$ = buildNonTerminalNode('IBM-DEFINITION',
            buildTerminalNode('IBMQASM', $1, @1),
            buildTerminalNode('REAL', $2, @2),
            buildTerminalNode('PUNCT', $3, @3),
            buildNonTerminalNode('INCLUDE', $4)
        ); 
    }
    | IBMQASM REAL ';' 
    { 
        $$ = buildNonTerminalNode('IBM-DEFINITION',
            buildTerminalNode('IBMQASM', $1, @1),
            buildTerminalNode('REAL', $2, @2),
            buildTerminalNode('PUNCT', $3, @3)
        ); 
    } 
    ;

Include
    : 'include' 'QELIB.INC' ';' 
    { 
        $$ = buildNonTerminalNode('INCLUDE-DEFINITION', 
            buildTerminalNode('INCLUDE', $1, @1),
            buildTerminalNode('LIB', $2, @2),
            buildTerminalNode('PUNCT', $3, @3)   
        ); // TODO: Support include in parser
    }
    ;

Library
    : Declaration { $$ = buildNonTerminalNode('LIBRARY', $1); }
    | Library Declaration { $$ = buildNonTerminalNode('LIBRARY', $1, $2); }
    ;

Program
    : Statement { $$ = buildNonTerminalNode('PROGRAM', $1); }
    | error Statement { $$ = buildNonTerminalNode('PROGRAM', $2); }
    | Program Statement { $$ = buildNonTerminalNode('PROGRAM', $1, $2); }
    | Program error Statement { $$ = buildNonTerminalNode('PROGRAM', $1, $3); }
    ;

Statement
    : Declaration { $$ = buildNonTerminalNode('STATEMENT', $1); }
    | QOperation ';'
    {
        $$ = buildNonTerminalNode('STATEMENT', 
            $1,
            buildTerminalNode('PUNCT', $2, @2)
        );
    }
    | Magic ';'
    {
        $$ = buildNonTerminalNode('STATEMENT', 
            $1,
            buildTerminalNode('PUNCT', $2, @2)
        );
    }
    // TODO: The user can define its own gates
    // | GateDefinition { console.log('Definition: %j', $1); }
    ;

Declaration
    : QRegDeclaration { $$ = buildNonTerminalNode('DECLARATION', $1); }
    | CRegDeclaration { $$ = buildNonTerminalNode('DECLARATION', $1); }
    | GateDeclaration { $$ = buildNonTerminalNode('DECLARATION', $1); }
    ;

QRegDeclaration
    : QREG ID '[' INT ']' ';' 
    {
        $$ = buildNonTerminalNode('QREG-DECLARATION', 
            buildTerminalNode('QREG', $1, @1),
            buildTerminalNode('ID', $2, @2),
            buildTerminalNode('PUNCT', $3, @3),
            buildTerminalNode('INT', $4, @4),
            buildTerminalNode('PUNCT', $5, @5),
            buildTerminalNode('PUNCT', $6, @6)
        );
    }
    ;

CRegDeclaration
    : CREG ID '[' INT ']' ';' 
    {
        $$ = buildNonTerminalNode('CREG-DECLARATION',
            buildTerminalNode('CREG', $1, @1),
            buildTerminalNode('ID', $2, @2),
            buildTerminalNode('PUNCT', $3, @3),
            buildTerminalNode('INT', $4, @4),
            buildTerminalNode('PUNCT', $5, @5),
            buildTerminalNode('PUNCT', $6, @6)
        );
    }
    ;

GateDeclaration
    : GATE Id GateScope BitList GateBody 
    { 
        $$ = buildNonTerminalNode('GATE-DECLARATION',
            buildTerminalNode('GATE', $1, @1),
            $2,
            $3,
            $4,
            $5
        );
    }
    | GATE Id GateScope '(' ')' BitList GateBody 
    { 
        $$ = buildNonTerminalNode('GATE-DECLARATION',
            buildTerminalNode('GATE', $1, @1),
            $2,
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            buildTerminalNode('PUNCT', $5, @5),
            $6,
            $7
        );
    } 
    | GATE Id GateScope '(' GateIdList ')' BitList GateBody  
    { 
        $$ = buildNonTerminalNode('GATE-DECLARATION',
            buildTerminalNode('GATE', $1, @1),
            $2,
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            $5,
            buildTerminalNode('PUNCT', $6, @6),
            $7,
            $8
        );
    }
    ;

GateIdList
    : Gate { $$ = buildNonTerminalNode('GATE-ID-LIST', $1); }
    | GateIdList ',' Gate { $$ = buildNonTerminalNode('GATE-ID-LIST', $1, $3); }
    ;

Gate
    : Id { $$ = buildNonTerminalNode('GATE-ID', $1); }
    ;

    // TODO: empty in the source ???
GateScope
    :
    ;

BitList
    : Bit { $$ = buildNonTerminalNode('BITLIST', $1); }
    | BitList ',' Bit { $$ = buildNonTerminalNode('BITLIST', $1, $3); }
    ;

Bit
    : Id { $$ = buildNonTerminalNode('BIT', $1); }
    ;

GateBody
    : '{' GateOpList '}' 
    {
        $$ = buildNonTerminalNode(
            buildTerminalNode('PUNCT', $1, @1),
            $2,
            buildTerminalNode('PUNCT', $3, @3)
        );
    }
    | '{' '}'
    {
        $$ = buildNonTerminalNode(
            buildTerminalNode('PUNCT', $1, @1),
            buildTerminalNode('PUNCT', $2, @2)
        );
    }
    ;

GateOpList
    : GateOp { $$ = buildNonTerminalNode('GATEOP-LIST', $1); } 
    | GateOpList GateOp { $$ = buildNonTerminalNode('GATEOP-LIST', $1, $2); }
    ;

GateOp
    : U '(' ExpList ')' Id ';' 
    {
        $$ = buildNonTerminalNode('GATEOP',
            buildTerminalNode('U', $1, @1),
            buildTerminalNode('PUNCT', $2, @2),
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            $5,
            buildTerminalNode('PUNCT', $6, @6)
        );
    }
    | CX Id ',' Id ';' 
    {
        $$ = buildNonTerminalNode('GATEOP',
            buildTerminalNode('CX', $1, @1),
            $2,
            buildTerminalNode('PUNCT', $3, @3),
            $4,
            buildTerminalNode('PUNCT', $5, @5)
        );
    }
    | Id IdList ';' 
    {
        $$ = buildNonTerminalNode('GATEOP',
            $1,
            $2,
            buildTerminalNode('PUNCT', $3, @3)
        );
    }
    | Id '(' ')' IdList ';' 
    {
        $$ = buildNonTerminalNode('GATEOP',
            $1,
            buildTerminalNode('PUNCT', $2, @2),
            buildTerminalNode('PUNCT', $3, @3),
            $4,
            buildTerminalNode('PUNCT', $5, @5)
        );
    }
    | Id '(' ExpList ')' IdList ';'
    {
        $$ = buildNonTerminalNode('GATEOP',
            $1,
            buildTerminalNode('PUNCT', $2, @2),
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            $5,
            buildTerminalNode('PUNCT', $6, @6)
        );
    }
    | BARRIER IdList ';' 
    {
        $$ = buildNonTerminalNode('GATEOP',
            buildTerminalNode('BARRIER', $1, @1),
            $2,
            buildTerminalNode('PUNCT', $3, @3)
        );
    }
    ;

ExpList
    : Expression { $$ = buildNonTerminalNode('EXPRESSION-LIST', $1); }
    | ExpList ',' Expression { $$ = buildNonTerminalNode('EXPRESSION-LIST', $1, $3); }
    ;

Expression
    : MultiplicativeExpression { $$ = buildNonTerminalNode('EXPRESSION', $1); }
    | Expression '^' MultiplicativeExpression { $$ = buildNonTerminalNode('POW', $1, $3); }
    ;

MultiplicativeExpression
    : AdditiveExpression { $$ = buildNonTerminalNode('EXPRESSION', $1); }
    | MultiplicativeExpression '*' MultiplicativeExpression { $$ = buildNonTerminalNode('MULTIPLICATION', $1, $3); }
    | MultiplicativeExpression '/' MultiplicativeExpression { $$ = buildNonTerminalNode('DIVISION', $1, $3); }
    ;

AdditiveExpression
    : PrefixExpression { $$ = buildNonTerminalNode('EXPRESSION', $1); }
    | AdditiveExpression '+' AdditiveExpression { $$ = buildNonTerminalNode('ADDITION', $1, $3); }
    | AdditiveExpression '-' AdditiveExpression { $$ = buildNonTerminalNode('SUBSTRACTION', $1, $3); }
    ;

PrefixExpression
    : Unary { $$ = buildNonTerminalNode('PREFIX', $1); }
    | '+' PrefixExpression 
    { 
        $$ = buildNonTerminalNode('PREFIX', 
            buildTerminalNode('PUNCT', $1, @1),
            $2
        ); 
    }
    | '-' PrefixExpression 
    { 
        $$ = buildNonTerminalNode('PREFIX', 
            buildTerminalNode('PUNCT', $1, @1),
            $2
        ); 
    }
    ;

Unary
    : INT { $$ = buildNonTerminalNode('UNARY', buildTerminalNode('INT', $1, @1)); }
    | REAL { $$ = buildNonTerminalNode('UNARY', buildTerminalNode('REAL', $1, @1)); }
    | PI { $$ = buildNonTerminalNode('UNARY', buildTerminalNode('PI', $1, @1)); }
    | Id { $$ = buildNonTerminalNode('UNARY', $1); }
    | '(' Expression ')' 
    { 
        $$ = buildNonTerminalNode('UNARY', 
            buildTerminalNode('PUNCT', $1, @1),
            $2,
            buildTerminalNode('PUNCT', $3, @3)
        ); 
    }
    // | Id '(' Expression ')'
    | Id '(' Expression ')'
    { 
        $$ = buildNonTerminalNode('UNARY', 
            $1,
            buildTerminalNode('PUNCT', $2, @2),
            $3,
            buildTerminalNode('PUNCT', $4, @4)
        ); 
    }
    ;

QOperation
    : UnitaryOperation { $$ = buildNonTerminalNode('QOP', $1); } 
    | Opaque { $$ = buildNonTerminalNode('QOP', $1); }
    | Measure { $$ = buildNonTerminalNode('QOP', $1); }
    | Barrier { $$ = buildNonTerminalNode('QOP', $1); }
    | Reset { $$ = buildNonTerminalNode('QOP', $1); }
    // | if
    ;

UnitaryOperation
    : U '(' ExprList ')' Primary ';' 
    {
        $$ = buildNonTerminalNode('UOP',
            buildTerminalNode('U', $1, @1),
            buildTerminalNode('PUNCT', $2, @2),
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            $5,
            buildTerminalNode('PUNCT', $6, @6)
        );
    }
    | CX Primary ',' Primary 
    {
        $$ = buildNonTerminalNode('UOP',
            buildTerminalNode('CX', $1, @1),
            $2, 
            buildTerminalNode('PUNCT', $3, @3),
            $4
        );
    }
    | Id PrimaryList  { $$ = buildNonTerminalNode('UOP', $1, $2); }
    | Id '(' ')' PrimaryList 
    {
        $$ = buildNonTerminalNode('UOP',
            $1,
            buildTerminalNode('PUNCT', $2, @2),
            buildTerminalNode('PUNCT', $3, @3),
            $4
        );
    }
    | Id '(' ExpressionList ')' PrimaryList 
    {
        $$ = buildNonTerminalNode('UOP',
            $1,
            buildTerminalNode('PUNCT', $2, @2),
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            $5
        );
    }
    ;


Primary
    : Id { $$ = buildNonTerminalNode('PRIMARY', $1); } 
    | IndexedId { $$ = buildNonTerminalNode('PRIMARY', $1); }
    ;

Id
    : ID { $$ = buildTerminalNode('ID', $1, @1); } 
    ;

PrimaryList
    : Primary { $$ = buildNonTerminalNode('PRIMARY-LIST', $1); }
    | PrimaryList ',' Primary { $$ = buildNonTerminalNode('PRIMARY-LIST', $1, $3); }
    ;

IndexedId
    : ID '[' INT ']' 
    { 
        $$ = buildNonTerminalNode('INDEXED-ID', 
            buildTerminalNode('ID', $1, @1),
            buildTerminalNode('PUNCT', $2, @2),
            buildTerminalNode('INT', $3, @3),
            buildTerminalNode('PUNCT', $4, @4)
        );
    }
    ;

Barrier
    : BARRIER PrimaryList 
    { 
        $$ = buildNonTerminalNode('BARRIER', 
            buildTerminalNode('BARRIER', $1, @1),
            $2
        );
    }
    ;

Measure
    : MEASURE Primary '->' Primary 
    {
        $$ = buildNonTerminalNode('MEASURE-NODE',
            buildTerminalNode('MEASURE', $1, @1),
            $2,
            buildTerminalNode('PUNCT', $3, @3),
            $4
        );
    }
    ;

IdList
    : Id { $$ = buildNonTerminalNode('ID-LIST', $1); }
    | IdList ',' Id { $$ = buildNonTerminalNode('ID-LIST', $1, $3); }
    ;

Reset
    : RESET Primary 
    { 
        $$ = buildNonTerminalNode('RESET-NODE',
            buildTerminalNode('RESET', $1, @1),
            $2
        );
    }
    ;

Opaque
    : OPAQUE Id GateScope BitList 
    { 
        $$ = buildNonTerminalNode('OPAQUE-NODE',
            buildTerminalNode('OPAQUE', $1, @1),
            $2, 
            $3,
            $4
        ); 
    }
    | OPAQUE Id GateScope '(' ')' BitList 
    { 
        $$ = buildNonTerminalNode('OPAQUE-NODE',
            buildTerminalNode('OPAQUE', $1, @1),
            $2, 
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            buildTerminalNode('PUNCT', $5, @5),
            $6
        ); 
    }
    | OPAQUE Id GateScope '(' GateIdList ')' BitList 
    { 
        $$ = buildNonTerminalNode('OPAQUE-NODE',
            buildTerminalNode('OPAQUE', $1, @1),
            $2, 
            $3,
            buildTerminalNode('PUNCT', $4, @4),
            $5,
            buildTerminalNode('PUNCT', $6, @6),
            $7
        ); 
    }
    ;
