const configUtils = {
  siteName: 'stroo',
  apiURL: process.env.NEXT_PUBLIC_API_URL,
  assetsURL: process.env.NEXT_PUBLIC_API_URL,
  gaTrackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  features: {
    complain: process.env.FEATURE_COMPLAIN,
  },
}

export function isEnabledFeature(feature: string) {
  return !!configUtils.features[feature]
}

export default configUtils
