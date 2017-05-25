import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { LoginPage } from './login';

let fixture: ComponentFixture<LoginPage> = null;
let instance: any = null;

describe('Pages: Login', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the login page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
