import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { A4jFunction, A4jExecute, A4jCollect, A4jVariable } from '../model/model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormMultiplier } from '../form-multiplier';
import { JarService } from '../jar.service';
import { AggregatorService } from '../aggregator.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {
  debug: boolean = false;
  control: FormGroup;
  trace:FormControl=new FormControl('{}');
  error: String;
  jarName: String="";
  constructor(private service: ProjectService,private jarService: JarService, private aggregatorService:AggregatorService,private route: ActivatedRoute,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.control = formBuilder.group({
      name: '',
      id: '',
      jarName: '',
      configuration: formBuilder.group({
        functionList: new FormMultiplier(() => this.formBuilder.group(new A4jFunction())),
        classList: new FormMultiplier(() => this.addClass()),
        analysedPackage: ''
      }),
      jsonPayload: '',
      className: ''
    });
  }
  

  addClass(): FormGroup {
    return this.formBuilder.group({
      classContext: '',
      className: '',
      executeList: new FormMultiplier(() => this.formBuilder.group(new A4jExecute())),
      collectList: new FormMultiplier(() => this.formBuilder.group(new A4jCollect())),
      variableList: new FormMultiplier(() => this.formBuilder.group(new A4jVariable()))

    });
  }
  jarNameChanged(jarName: String) {
    this.jarName = jarName;
    this.getClasses();
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProject(params.get('id')))
    ).subscribe(project => {
      console.log("just before patch");
      this.control.patchValue(project);
      console.log("just after patch");
      this.control.valueChanges.pipe(debounceTime(1000))
        .subscribe(event => {
          this.error = "";
          this.trace.setValue("");
          this.service.saveProject(this.control.value).subscribe(
            response => {
              this.snackBar.open("Form saved ", null, { duration: 400 });
            },
            error => {
              console.log(error);
              this.error = error.error.message;
              this.snackBar.open("Form not saved ", null, { duration: 1400 });
            });
        });
    });
    this.getJars();
  }
  public jars:String[]=[];
  getJars() {
    this.jars = [];
    this.jarService.getJars().subscribe((data) => {
      this.jars = data;
    });
  }
  public classes:String[]=[];
  getClasses() {
    this.classes = [];
    this.jarService.getClasses(this.jarName).subscribe((data) => {
      this.classes = data;
    });
  }

  debugMode(event: MatSlideToggleChange) {
    this.debug = event.checked;
  }
  evaluate(){
    console.log(this.control.value);
    this.error = "";
          this.aggregatorService.evaluateProject(this.control.value).subscribe(
            response => {
              this.control.get("jsonPayload").setValue(JSON.stringify(response.body.result));
              this.trace.setValue(response.body.trace);
              this.snackBar.open("evaluated ", null, { duration: 400 });
            },
            error => {
              console.log(error);
              this.error = error.error.message;
              this.snackBar.open("Form not evaluated ", null, { duration: 1400 });
            });
  }
}
