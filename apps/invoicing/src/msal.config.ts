import {
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
  BrowserCacheLocation,
  InteractionType,
} from '@azure/msal-browser';

export interface MSALConfig {
  scopes: string[];
}

export const MSALConfig: MSALConfig = {
  scopes: ['user.read'],
};

export function loggerCallback(logLevel: LogLevel, message: string): void {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: process.env['NX_MSAL_CONFIG_CLIENT_ID']!,
      authority: `https://login.microsoftonline.com/${process.env['NX_MSAL_CONFIG_TENANT_ID']}/`,
      redirectUri: `${process.env['NX_MSAL_CONFIG_URI_DEFAULT']}/${process.env['NX_MSAL_CONFIG_REDIRECT']}`,
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false,
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    'https://graph.microsoft.com/v1.0/me',
    MSALConfig.scopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: MSALConfig.scopes,
    },
    loginFailedRoute: '/login-failed',
  };
}
