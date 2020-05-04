export class Project {
  id = '';
  name = '';
  jarName = '';
  configuration: Aggregator4j = new Aggregator4j();
  jsonPayload: '{}';
  className = '';
}

export class Aggregator4j {
  analysedPackage = '';
  processing = '';
  functionList: A4jFunction[] = new A4jFunction[0]();
  classList: A4jClass[] = new A4jClass[0]();
}

export class A4jFunction {
  registerClass = '';
  namespace = '';
}

export class A4jClass {
  classContext = '';
  className = '';
  executeList: A4jExecute [] = [];
  collectList: A4jCollect [] = [];
  variableList: A4jVariable [] = [];
}

export class A4jExecute {
  jexl = '';
  when = '';
  field = '';
}

export class A4jCollect {
  field = '';
  what = '';
  to = '';
  when = '';
}

export class A4jVariable {
  field = '';
  variable = '';
}
