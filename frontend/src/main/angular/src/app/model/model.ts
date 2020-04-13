export class Project {
    id : String = '';
    name : String = '';
    configuration : Aggregator4j = new Aggregator4j;
    jsonPayload : '{}';
    className : String = '';
}    
export class Aggregator4j {
    functionList : Function[]=new Function[0];
    classList : Class[]=new Class[0];
    analysedPackage : String = '';
}
export class Function {
    registerClass : String = '';
    namespace : String = '';
}
export class Class {
    classContext : String = '';
    className : String = '';
    executeList : Execute []= [];
    collectList : Collect []= [];
    variableList : Variable []= [];
}
export class Execute {
    jexl : String = '';
    when : String = '';
    field : String = '';
}
export class Collect {
    field : String = '';
    what : String = '';
    to : String = '';
    when : String = '';
}
export class Variable {
    field : String = '';
    variable : String = '';
}