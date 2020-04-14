export class Project {
    id : String = '';
    name : String = '';
    configuration : Aggregator4j = new Aggregator4j;
    jsonPayload : '{}';
    className : String = '';
}    
export class Aggregator4j {
    functionList : A4jFunction[]=new A4jFunction[0];
    classList : A4jClass[]=new A4jClass[0];
    analysedPackage : String = '';
}
export class A4jFunction {
    registerClass : String = ''; 
    namespace : String = '';
}
export class A4jClass {
    classContext : String = '';
    className : String = '';
    executeList : A4jExecute []= [];
    collectList : A4jCollect []= [];
    variableList : A4jVariable []= [];
}
export class A4jExecute {
    jexl : String = '';
    when : String = '';
    field : String = '';
}
export class A4jCollect {
    field : String = '';
    what : String = '';
    to : String = '';
    when : String = '';
}
export class A4jVariable {
    field : String = '';
    variable : String = '';
}