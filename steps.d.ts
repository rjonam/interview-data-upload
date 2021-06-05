/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type MailSlurp = import('@codeceptjs/mailslurp-helper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Webdriver, MailSlurp {}
  interface I extends ReturnType<steps_file>, WithTranslation<Webdriver>, WithTranslation<MailSlurp> {}
  namespace Translation {
    interface Actions {}
  }
}
