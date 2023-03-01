import { TextField } from '@mui/material';
import { MessageKeyBase } from 'keycloakify';
import { clsx } from 'keycloakify/lib/tools/clsx';
import type { KcContext } from '../../kcContext';

type LoginType = {
  username?: string | undefined;
  rememberMe?: boolean | undefined;
}

interface LoginInputProps {
  realm: KcContext['realm'] & {loginWithEmailAllowed: boolean};
  kcLabelClass: string | readonly string[] | undefined;
  login: LoginType;
  usernameEditDisabled: boolean;
}

function UsernameInput(props: LoginInputProps) {
  const {
    realm,
    kcLabelClass,
    login,
    usernameEditDisabled,
  } = props;

  const { username } = login;

  let label: MessageKeyBase | 'alphanumericalCharsOnly';

  if (!realm.loginWithEmailAllowed) {
    label = 'username';
  } else if (realm.registrationEmailAsUsername) {
    label = 'email';
  } else {
    label = 'usernameOrEmail';
  }

  const autoCompleteHelper: typeof label = label === 'usernameOrEmail' ? 'username' : label;

  return (
    <TextField
      placeholder="Enter your email address or username"
      label="Email or username"
      name={autoCompleteHelper}
      defaultValue={username ?? ''}
      type="text"
      disabled={usernameEditDisabled}
      autoComplete={usernameEditDisabled ? undefined : 'off'}
      fullWidth
      sx={{ mb: 2 }}
      InputLabelProps={{
        sx: { fontSize: '16px' },
        className: clsx(kcLabelClass),
      }}
      InputProps={{
        sx: { fontSize: '16px', borderRadius: '8px' },
      }}
    />
  );
}

export default UsernameInput;
