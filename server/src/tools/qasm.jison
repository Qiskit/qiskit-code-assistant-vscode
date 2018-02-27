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
            errors: []
        } 
    }
    ;

MainProgram
    : IbmDefinition { $$ = $1; }
    | IbmDefinition Program { $$ = [$1, $2]; }
    | Library 
    ;

IbmDefinition
    : IBMQASM REAL ';' Include
    | IBMQASM REAL ';'
    {
        $$ = [
            { type: 'IBMQASM', value: $1, foo: @1 },
            { type: 'REAL', value: $2, foo: @2 },
            { type: ';', value: $3, foo: @3 },
        ]
    } 
    ;

Include
    : 'include' 'QELIB.INC' ';' // TODO: Support include in parser
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
    : Statement { $$ = $1; }
    | Program Statement
    ;

Statement
    : Declaration { $$ = $1; }
    | QOperation ';'
    | Magic ';'
    // TODO: The user can define its own gates
    // | GateDefinition { console.log('Definition: %j', $1); }
    ;

Declaration
    : QRegDeclaration { $$ = $1 }
    | CRegDeclaration
    | GateDeclaration
    ;

QRegDeclaration
    : QREG ID '[' INT ']' ';' 
    {
        $$ = [
            { type: 'QREG', value: $1, foo: @1 },
            { type: 'ID', value: $2, foo: @2 },
            { type: '[', value: $3, foo: @3 },
            { type: 'INT', value: $4, foo: @4 },
            { type: ']', value: $5, foo: @5 },
            { type: ';', value: $6, foo: @6 },
        ]
    }
    ;

CRegDeclaration
    : CREG ID '[' INT ']' ';' 
    ;

GateDeclaration
    : GATE Id GateScope BitList GateBody
    | GATE Id GateScope '(' ')' BitList GateBody
    | GATE Id GateScope '(' GateIdList ')' BitList GateBody
    ;

GateIdList
    : Gate 
    | GateIdList ',' Gate
    ;

Gate
    : Id
    ;

    // TODO: empty in the source ???
GateScope
    :
    ;

BitList
    : Bit 
    | BitList ',' Bit
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
    : ID
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
    : OPAQUE Id GateScope BitList 
    | OPAQUE Id GateScope '(' ')' BitList 
    | OPAQUE Id GateScope '(' GateIdList ')' BitList 
    ;
