/**
 * Optional Firebase Cloud Messaging (FCM) push notification registration.
 *
 * Disabled by default. Only runs when NEXT_PUBLIC_ENABLE_PUSH=true
 * (checked in CapacitorBridge.tsx) so the app works fine without ever
 * touching a Firebase project. To enable later:
 *   1. Create a Firebase project, add the Android app (applicationId
 *      must match capacitor.config.ts's appId: com.jonahjewels.app).
 *   2. Download google-services.json into android/app/.
 *   3. Set NEXT_PUBLIC_ENABLE_PUSH=true in your env.
 *   4. Wire the device token below to your backend's device-token endpoint.
 */
export async function registerPush() {
  const { PushNotifications } = await import('@capacitor/push-notifications');

  const permission = await PushNotifications.requestPermissions();
  if (permission.receive !== 'granted') return;

  await PushNotifications.register();

  PushNotifications.addListener('registration', (token) => {
    // TODO: POST token.value to your backend so it can target this device.
    console.log('[push] device token:', token.value);
  });

  PushNotifications.addListener('registrationError', (err) => {
    console.error('[push] registration error:', err);
  });

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('[push] received while app open:', notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    console.log('[push] tapped:', action.notification);
  });
}
