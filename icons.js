// icons.js
const WIDGET_TYPES = {
    USERNAME: {
      type: 'USERNAME',
      color: 'var(--username-color)',
      label: 'Username',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>`
    },
    NAME: {
      type: 'NAME',
      color: 'var(--name-color)',
      label: 'Name',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
        <path d="M12 14c-4.97 0-9 2.015-9 4.5V20h18v-1.5c0-2.485-4.03-4.5-9-4.5z"></path>
      </svg>`
    },
    EMAIL: {
      type: 'EMAIL',
      color: 'var(--email-color)',
      label: 'Email',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>`
    },
    SOCIAL_MEDIA: {
      type: 'SOCIAL_MEDIA',
      color: 'var(--social-media-color)',
      label: 'Social Media ID',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>`,
      icons: {
        'Discord': `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.045-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 0-.08.013c-.126.087-.258.177-.39.268a.071.071 0 0 0-.019.018c.06.038.318.217 1.026.633a17.837 17.837 0 0 0 5.078 0c.708-.416.966-.595 1.026-.633a.076.076 0 0 0-.019-.018c-.132-.09-.264-.18-.39-.268a.078.078 0 0 0-.08-.013c-.597.27-1.22.56-1.872.892a.077.077 0 0 0-.041.106c.352.698.764 1.364 1.226 1.994a.077.077 0 0 0 .084.028 19.892 19.892 0 0 0 5.992-3.03.082.082 0 0 0 .032-.057c.418-4.477-.436-9.01-3.51-13.688a.066.066 0 0 0-.032-.027zM8.5 15.5c-.687 0-1.25-.563-1.25-1.25s.563-1.25 1.25-1.25 1.25.563 1.25 1.25S9.187 15.5 8.5 15.5zm7 0c-.687 0-1.25-.563-1.25-1.25s.563-1.25 1.25-1.25 1.25.563 1.25 1.25S15.687 15.5 15.5 15.5z"></path>
        </svg>`,
        'Facebook': `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>`,
        'Github': `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>`,
        'Instagram': `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>`,
        'Twitter': `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>`,
        'Something else': `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8M8 12h8"></path>
        </svg>`
      }
    },
    ENCRYPTION_KEY: {
      type: 'ENCRYPTION_KEY',
      color: 'var(--encryption-key-color)',
      label: 'Encryption Key',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        <circle cx="12" cy="16" r="1"></circle>
      </svg>`
    },
    PASSWORD: {
      type: 'PASSWORD',
      color: 'var(--password-color)',
      label: 'Password',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        <line x1="12" y1="15" x2="12" y2="17"></line>
      </svg>`
    },
    CRYPTO_WALLET: {
      type: 'CRYPTO_WALLET',
      color: 'var(--crypto-wallet-color)',
      label: 'Crypto Wallet',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
        <circle cx="15" cy="12" r="2"></circle>
      </svg>`,
      icons: {
        "Bitcoin": "<svg viewBox=\"0 0 273.6 360\" fill=\"currentColor\" stroke=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M217.021,167.042c18.631-9.483,30.288-26.184,27.565-54.007c-3.667-38.023-36.526-50.773-78.006-54.404l-0.008-52.741 h-32.139l-0.009,51.354c-8.456,0-17.076,0.166-25.657,0.338L108.76,5.897l-32.11-0.003l-0.006,52.728 c-6.959,0.142-13.793,0.277-20.466,0.277v-0.156l-44.33-0.018l0.006,34.282c0,0,23.734-0.446,23.343-0.013 c13.013,0.009,17.262,7.559,18.484,14.076l0.01,60.083v84.397c-0.573,4.09-2.984,10.625-12.083,10.637 c0.414,0.364-23.379-0.004-23.379-0.004l-6.375,38.335h41.817c7.792,0.009,15.448,0.13,22.959,0.19l0.028,53.338l32.102,0.009 l-0.009-52.779c8.832,0.18,17.357,0.258,25.684,0.247l-0.009,52.532h32.138l0.018-53.249c54.022-3.1,91.842-16.697,96.544-67.385 C266.916,192.612,247.692,174.396,217.021,167.042z M109.535,95.321c18.126,0,75.132-5.767,75.14,32.064 c-0.008,36.269-56.996,32.032-75.14,32.032V95.321z M109.521,262.447l0.014-70.672c21.778-0.006,90.085-6.261,90.094,35.32 C199.638,266.971,131.313,262.431,109.521,262.447z\"/></svg>",
        "Doge": "<svg viewBox=\"0 0 225.000000 225.000000\" fill=\"currentColor\" stroke=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M762 2147 c-25 -29 -35 -111 -30 -237 7 -165 6 -172 -45 -198 -23 -12 -91 -52 -151 -89 -120 -75 -111 -63 -205 -263 -72 -151 -90 -221 -98 -365 -17 -354 189 -682 522 -828 133 -58 207 -72 375 -71 139 1 164 3 244 28 166 50 290 123 399 234 105 106 174 220 219 362 20 66 23 95 23 235 0 136 -3 173 -23 245 -27 97 -86 230 -132 293 -41 58 -46 100 -24 189 13 51 18 107 18 183 -1 118 -13 180 -42 216 -34 40 -64 21 -227 -147 -172 -177 -159 -171 -313 -134 -46 11 -107 20 -137 20 -29 0 -61 3 -70 6 -9 4 -31 36 -50 73 -45 89 -127 204 -168 235 -37 28 -69 33 -85 13z\"/></svg>",
        "Ethereum": "<svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z\"/></svg>",
        "Monero": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 0C5.365 0 0 5.373 0 12.015c0 1.335.228 2.607.618 3.81h3.577V5.729L12 13.545l7.805-7.815v10.095h3.577c.389-1.203.618-2.475.618-3.81C24 5.375 18.635 0 12 0zm-1.788 15.307l-3.417-3.421v6.351H1.758C3.87 21.689 7.678 24 12 24s8.162-2.311 10.245-5.764h-5.04v-6.351l-3.386 3.421-1.788 1.79-1.814-1.79h-.005z\"/></svg>",
        "Solana": "<svg viewBox=\"0 0 225.000000 225.000000\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M678 1768 c-25 -20 -208 -301 -208 -319 0 -39 12 -39 566 -37 l539 3 103 153 c56 84 102 159 102 167 0 7 -7 21 -16 29 -14 14 -77 16 -543 16 -407 0 -531 -3 -543 -12z m910 -173 l-63 -95 -463 0 -462 0 62 95 63 95 463 0 462 0 -62 -95z\"/><path d=\"M478 1285 c-10 -23 -2 -38 95 -185 l107 -160 540 0 540 0 12 25 c10 23 2 38 -95 185 l-107 160 -540 0 -540 0 -12 -25z m1110 -160 l62 -95 -462 0 -463 0 -63 95 -62 95 462 0 463 0 63 -95z\"/><path d=\"M668 823 c-32 -36 -198 -295 -198 -308 0 -7 7 -21 16 -29 14 -14 77 -16 550 -16 l534 0 101 152 c56 83 104 160 107 170 12 48 17 48 -558 48 -499 0 -538 -1 -552 -17z m920 -168 l-63 -95 -463 0 -462 0 62 95 63 95 463 0 462 0 -62 -95z\"/></svg>",
        "Something else": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v8M8 12h8\"/></svg>"
      }
    },
    IP_ADDRESS: {
      type: 'IP_ADDRESS',
      color: 'var(--ip-address-color)',
      label: 'IP Address',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M12 2v2m0 16v2m10-10h-2M2 12h2m15.5-6.5L17 8m-10 10L4.5 15.5m13 0L20 18m-16-10L6.5 5.5"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>` // Network-like icon with central node and connections
    },
    DOMAIN: {
      type: 'DOMAIN',
      color: 'var(--domain-color)',
      label: 'Domain',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12h6m-3-3v6"></path>
      </svg>`
    },
    ONION_SITE: {
      type: 'ONION_SITE',
      color: 'var(--onion-site-color)',
      label: 'Onion Site',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
      </svg>` // Tor Browser-inspired onion icon
    },
    LOCATION: {
      type: 'LOCATION',
      color: 'var(--location-color)',
      label: 'Location',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>`
    },
    IMAGE: {
      type: 'IMAGE',
      color: 'var(--image-color)',
      label: 'Image',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>`
    },
    CUSTOM_FIELD: {
      type: 'CUSTOM_FIELD',
      color: 'var(--custom-field-color)',
      label: 'Custom Field',
      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>`
    }
  };