// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/pages/Login.tsx
import { useState, type FormEventHandler } from 'react';
import { clsx } from 'keycloakify/lib/tools/clsx';
import { useConstCallback } from 'keycloakify/lib/tools/useConstCallback';
import type { PageProps } from 'keycloakify/lib/KcProps';
import {
  Box, Button, Checkbox, FormControlLabel, Paper, Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import PasswordTextField from '../components/password-text-field';
import type { KcContext } from '../kcContext';
import type { I18n } from '../i18n';
import UsernameInput from '../components/username-input';

function Header() {
  return (
    <Typography sx={{ color: '#636466' }} variant="h2" component="span">
      Welcome back!
    </Typography>
  );
}

export default function Login(props: PageProps<Extract<KcContext, { pageId: 'login.ftl'; }>, I18n>) {
  const {
    kcContext, i18n, doFetchDefaultThemeResources = true, Template,
    kcLabelClass,
    ...kcProps
  } = props;

  const {
    social, realm, url, usernameEditDisabled, login, auth, registrationDisabled,
  } = kcContext;

  const { msg } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    // NOTE: Even if we login with email Keycloak expect username and password in
    // the POST request.
    formElement.querySelector("input[name='email']")?.setAttribute('name', 'username');

    formElement.submit();
  });

  return (
    <Paper
      component={Template}
      kcContext={kcContext}
      i18n={i18n}
      doFetchDefaultThemeResources={doFetchDefaultThemeResources}
      {...kcProps}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={<Header />}
      formNode={(
        <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && kcProps.kcContentWrapperClass)}>
          <div
            id="kc-form-wrapper"
            className={clsx(
              realm.password
              && social.providers
              && [kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass],
            )}
          >
            {realm.password && (
            <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
              <div className={clsx(kcProps.kcFormGroupClass)}>
                <UsernameInput
                  kcLabelClass={kcLabelClass}
                  login={login}
                  realm={realm}
                  usernameEditDisabled={usernameEditDisabled}
                />
              </div>
              <div className={clsx(kcProps.kcFormGroupClass)}>
                <PasswordTextField
                  tabIndex={-2}
                  placeholder="Enter your password"
                  label="Password"
                  autoComplete="password"
                  name="password"
                  id="password"
                />
              </div>
              <div className={clsx(kcProps.kcFormGroupClass, kcProps.kcFormSettingClass)}>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameEditDisabled && (
                  <div className="checkbox">
                    <FormControlLabel
                      label={<Typography fontSize="16px">{msg('rememberMe')}</Typography>}
                      control={(
                        <Checkbox
                          sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                          }}
                          tabIndex={-3}
                          id="rememberMe"
                          name="rememberMe"
                          {...(login.rememberMe ? { checked: true } : {})}
                        />
)}
                    />
                  </div>
                  )}
                </div>
                <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                  {realm.resetPasswordAllowed && (
                  <Typography
                    tabIndex={-5}
                    href={url.loginResetCredentialsUrl}
                    gutterBottom
                    component={Link}
                    sx={{
                      cursor: 'pointer',
                      color: '#72767b',
                      textDecorationColor: '#72767b',
                      fontSize: '16px',
                    }}
                  >
                    Forgot password?
                  </Typography>
                  )}
                </div>
              </div>
              <div id="kc-form-buttons" className={clsx(kcProps.kcFormGroupClass)}>
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  value={auth?.selectedCredential ?? ''}
                />
                <Button
                  variant="contained"
                  tabIndex={-4}
                  fullWidth
                  sx={{
                    borderRadius: '6px', backgroundColor: '#005595', color: 'white', fontSize: 16,
                  }}
                  name="login"
                  id="kc-login"
                  type="submit"
                  value="Sign in"
                  disabled={isLoginButtonDisabled}
                >
                  Sign in
                </Button>
              </div>
            </form>
            )}
          </div>
          {realm.password && social.providers !== undefined && (
          <div
            id="kc-social-providers"
            className={
            clsx(kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass)
}
          >
            <ul
              className={clsx(
                kcProps.kcFormSocialAccountListClass,
                social.providers.length > 4 && kcProps.kcFormSocialAccountDoubleListClass,
              )}
            >
              {social.providers.map((p) => (
                <li key={p.providerId} className={clsx(kcProps.kcFormSocialAccountListLinkClass)}>
                  <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx('zocial', p.providerId)}>
                    <span>{p.displayName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
  )}
      infoNode={
      realm.password
      && realm.registrationAllowed
      && !registrationDisabled && (
      <Box
        component="div"
        id="kc-registration"
        display="inline-flex"
        justifyContent="space-between"
        width="100%"
      >
        <Typography fontSize="16px">{msg('noAccount')}</Typography>
        <Typography
          component="a"
          fontSize="16px"
          tabIndex={-6}
          href={url.registrationUrl}
          sx={{
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {msg('doRegister')}
        </Typography>
      </Box>
      )
}
    />
  );
}
