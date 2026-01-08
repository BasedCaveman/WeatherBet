(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/GitHub/WeatherBet/src/lib/wagmi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "megaeth",
    ()=>megaeth,
    "networks",
    ()=>networks,
    "projectId",
    ()=>projectId,
    "wagmiAdapter",
    ()=>wagmiAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/utils/cookie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/createStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/chain/defineChain.js [app-client] (ecmascript)");
;
;
;
const projectId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_REOWN_PROJECT_ID || "ff6342f0134a0af6e9f7b972fb1c0afa";
const megaeth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 6342,
    name: "MegaETH",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH"
    },
    rpcUrls: {
        default: {
            http: [
                "https://carrot.megaeth.com/rpc"
            ]
        }
    },
    blockExplorers: {
        default: {
            name: "MegaETH Explorer",
            url: "https://www.megaexplorer.xyz"
        }
    },
    testnet: true
});
const networks = [
    megaeth
];
const wagmiAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiAdapter"]({
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStorage"])({
        storage: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookieStorage"]
    }),
    ssr: true,
    projectId,
    networks
});
const config = wagmiAdapter.wagmiConfig;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/WeatherBet/src/providers/Web3Provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Web3Provider",
    ()=>Web3Provider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit/dist/esm/exports/react.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$src$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/src/lib/wagmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
// Create query client
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]();
// Define metadata
const metadata = {
    name: "WeatherBet",
    description: "Simple weather prediction markets for everyone",
    url: ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable",
    icons: [
        "https://weatherbet.app/icon.png"
    ]
};
// Initialize AppKit - always call this
const appKit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAppKit"])({
    adapters: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$src$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiAdapter"]
    ],
    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$src$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectId"] || "demo",
    networks: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$src$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["networks"],
    defaultNetwork: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$src$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["megaeth"],
    metadata,
    features: {
        analytics: true,
        email: false,
        socials: false
    },
    themeMode: "light",
    themeVariables: {
        "--w3m-accent": "#22c55e",
        "--w3m-border-radius-master": "2px"
    }
});
function Web3Provider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$src$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiAdapter"].wagmiConfig,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: children
        }, void 0, false, {
            fileName: "[project]/Documents/GitHub/WeatherBet/src/providers/Web3Provider.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/GitHub/WeatherBet/src/providers/Web3Provider.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = Web3Provider;
var _c;
__turbopack_context__.k.register(_c, "Web3Provider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_GitHub_WeatherBet_src_c2813971._.js.map