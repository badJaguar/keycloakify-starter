// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/shared/Template.tsx

// You can replace all relative imports by cherry picking files from the keycloakify module.
// For example, the following import:
// import { assert } from "./tools/assert";
// becomes:
import { clsx } from 'keycloakify/lib/tools/clsx';
import type { TemplateProps } from 'keycloakify/lib/KcProps';
import { usePrepareTemplate } from 'keycloakify/lib/Template';
import type { KcContext } from './kcContext';
import type { I18n } from './i18n';

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    formNode,
    infoNode = null,
    kcContext,
    i18n,
    doFetchDefaultThemeResources,
    stylesCommon,
    styles,
    scripts,
    kcHtmlClass,
    kcLoginClass,
    kcFormCardClass,
    kcFormCardAccountClass,
    kcFormHeaderClass,
    kcContentWrapperClass,
    kcLabelWrapperClass,
    kcFormGroupClass,
    kcResetFlowIcon,
    kcFormSocialAccountContentClass,
    kcFormSocialAccountClass,
    kcSignUpClass,
    kcInfoAreaWrapperClass,
  } = props;

  const { msg } = i18n;

  const { auth, url } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources,
    stylesCommon,
    styles,
    scripts,
    url,
    kcHtmlClass,
  });

  if (!isReady) {
    return null;
  }

  function renderHeaderRequiredFields() {
    if (!(auth !== undefined && auth.showUsername && !auth.showResetCredentials)) {
      return (
        displayRequiredFields ? (
          <div className={clsx(kcContentWrapperClass)}>
            <div className={clsx(kcLabelWrapperClass, 'subtitle')}>
              <span className="subtitle">
                <span className="required">*</span>
                {msg('requiredFields')}
              </span>
            </div>
            <div className="col-md-10">
              <h1 id="kc-page-title">{headerNode}</h1>
            </div>
          </div>
        ) : (
          <h1 id="kc-page-title">{headerNode}</h1>
        )
      );
    }

    return (
      displayRequiredFields ? (
        <div className={clsx(kcContentWrapperClass)}>
          <div className={clsx(kcLabelWrapperClass, 'subtitle')}>
            <span className="subtitle">
              <span className="required">*</span>
              {' '}
              {msg('requiredFields')}
            </span>
          </div>
          <div className="col-md-10">
            {showUsernameNode}
            <div className={clsx(kcFormGroupClass)}>
              <div id="kc-username">
                <label htmlFor="kc-username" id="kc-attempted-username">{auth?.attemptedUsername}</label>
                <a id="reset-login" href={url.loginRestartFlowUrl}>
                  <div className="kc-login-tooltip">
                    <i className={clsx(kcResetFlowIcon)} />
                    <span className="kc-tooltip-text">{msg('restartLoginTooltip')}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {showUsernameNode}
          <div className={clsx(kcFormGroupClass)}>
            <div id="kc-username">
              <label htmlFor="kc-username" id="kc-attempted-username">{auth?.attemptedUsername}</label>
              <a id="reset-login" href={url.loginRestartFlowUrl}>
                <div className="kc-login-tooltip">
                  <i className={clsx(kcResetFlowIcon)} />
                  <span className="kc-tooltip-text">{msg('restartLoginTooltip')}</span>
                </div>
              </a>
            </div>
          </div>
        </>
      )
    );
  }

  return (
    <div className={clsx(kcLoginClass)}>
      <div className={clsx(kcFormCardClass, displayWide && kcFormCardAccountClass)}>
        <header className={clsx(kcFormHeaderClass)}>
          {renderHeaderRequiredFields()}
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">
            {formNode}
            {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
            <form
              id="kc-select-try-another-way-form"
              action={url.loginAction}
              method="post"
              className={clsx(displayWide && kcContentWrapperClass)}
            >
              <div className={clsx(displayWide
                && [kcFormSocialAccountContentClass, kcFormSocialAccountClass])}
              >
                <div className={clsx(kcFormGroupClass)}>
                  <input type="hidden" name="tryAnotherWay" value="on" />
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    id="try-another-way"
                    onClick={() => {
                      document.forms['kc-select-try-another-way-form' as never].submit();
                      return false;
                    }}
                  >
                    {msg('doTryAnotherWay')}
                  </a>
                </div>
              </div>
            </form>
            )}
            {displayInfo && (
            <div id="kc-info" className={clsx(kcSignUpClass)}>
              <div id="kc-info-wrapper" className={clsx(kcInfoAreaWrapperClass)}>
                {infoNode}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
