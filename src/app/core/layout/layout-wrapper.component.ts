import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LayoutWrapperService } from './layout-wrapper.service';


@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss'],
})
export class LayoutWrapperComponent implements AfterViewInit {
  isLoading: boolean;

  @Input() template: TemplateRef<any>;

  constructor(
    private layoutWrapperService: LayoutWrapperService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit() {
    this.layoutWrapperService.event.subscribe(
      isLoading => {
        this.isLoading = isLoading;
        this.cdr.detectChanges();
      },
    );
  }
}

@Directive({
  selector: '[appLayoutWrapper]',
})
export class LayoutWrapperDirective implements OnInit {

  private layoutWrapperContainer: ComponentRef<LayoutWrapperComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    const containerFactory = this.componentFactoryResolver.resolveComponentFactory(LayoutWrapperComponent);
    this.layoutWrapperContainer = this.viewContainerRef.createComponent(containerFactory);
    this.layoutWrapperContainer.instance.template = this.templateRef;
  }
}
