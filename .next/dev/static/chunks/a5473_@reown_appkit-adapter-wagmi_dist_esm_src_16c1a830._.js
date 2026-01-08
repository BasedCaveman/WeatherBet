(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/connectors/AuthConnector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authConnector",
    ()=>authConnector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-utils/dist/esm/src/ErrorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$auth$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit/dist/esm/exports/auth-provider.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit/dist/esm/src/auth-provider/W3MFrameProviderSingleton.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function authConnector(parameters) {
    let currentAccounts = [];
    let socialProvider = undefined;
    let connectSocialPromise = undefined;
    function parseChainId(chainId) {
        const networks = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM);
        let network = Number(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].parseEvmChainId(chainId));
        if (!networks.some((n)=>String(n.id) === String(chainId))) {
            const currentChainId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM)?.id || networks[0]?.id;
            if (currentChainId && Number.isInteger(Number(currentChainId))) {
                network = Number(currentChainId);
            }
        }
        if (!network) {
            throw new Error('ChainId not found in networks');
        }
        return network;
    }
    function getProviderInstance() {
        if (!socialProvider) {
            socialProvider = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameProviderSingleton"].getInstance({
                projectId: parameters.options.projectId,
                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])()?.caipNetworkId,
                enableLogger: parameters.options.enableAuthLogger,
                onTimeout: (reason)=>{
                    if (reason === 'iframe_load_failed') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.IFRAME_LOAD_FAILED, 'error');
                    } else if (reason === 'iframe_request_timeout') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.IFRAME_REQUEST_TIMEOUT, 'error');
                    } else if (reason === 'unverified_domain') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.UNVERIFIED_DOMAIN, 'error');
                    }
                },
                abortController: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].EmbeddedWalletAbortController,
                getActiveCaipNetwork: (namespace)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])(namespace),
                getCaipNetworks: (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(namespace)
            });
        }
        return socialProvider;
    }
    async function connectSocial(options = {}) {
        const provider = getProviderInstance();
        let chainId = options.chainId;
        if (options.isReconnecting) {
            const lastUsedChainId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].parseEvmChainId(provider.getLastUsedChainId() || '');
            const defaultChainId = parameters.chains?.[0].id;
            chainId = lastUsedChainId || defaultChainId;
            if (!chainId) {
                throw new Error('ChainId not found in provider');
            }
        }
        const preferredAccountType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])('eip155');
        const { address, chainId: frameChainId, accounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].authConnectorAuthenticate({
            authConnector: provider,
            chainId,
            preferredAccountType,
            socialUri: options.socialUri,
            chainNamespace: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM
        });
        currentAccounts = accounts?.map((a)=>a.address) || [
            address
        ];
        const parsedChainId = parseChainId(frameChainId);
        return {
            accounts: currentAccounts,
            account: address,
            chainId: parsedChainId,
            chain: {
                id: parsedChainId,
                unsupported: false
            }
        };
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_NAMES.AUTH,
            type: 'AUTH',
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
            async connect (options = {}) {
                if (connectSocialPromise) {
                    const result = await connectSocialPromise;
                    return {
                        accounts: options.withCapabilities ? result.accounts.map((address)=>({
                                address,
                                capabilities: {}
                            })) : result.accounts,
                        chainId: result.chainId
                    };
                }
                if (!connectSocialPromise) {
                    connectSocialPromise = new Promise((resolve)=>{
                        resolve(connectSocial(options));
                    });
                }
                const result = await connectSocialPromise;
                connectSocialPromise = undefined;
                return {
                    accounts: options.withCapabilities ? result.accounts.map((address)=>({
                            address,
                            capabilities: {}
                        })) : result.accounts,
                    chainId: result.chainId
                };
            },
            async disconnect () {
                const provider = await this.getProvider();
                await provider.disconnect();
            },
            getAccounts () {
                if (!currentAccounts?.length) {
                    return Promise.resolve([]);
                }
                config.emitter.emit('change', {
                    accounts: currentAccounts
                });
                return Promise.resolve(currentAccounts);
            },
            async getProvider () {
                if (!this.provider) {
                    this.provider = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameProviderSingleton"].getInstance({
                        projectId: parameters.options.projectId,
                        chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])()?.caipNetworkId,
                        enableLogger: parameters.options.enableAuthLogger,
                        abortController: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].EmbeddedWalletAbortController,
                        onTimeout: (reason)=>{
                            if (reason === 'iframe_load_failed') {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.IFRAME_LOAD_FAILED, 'error');
                            } else if (reason === 'iframe_request_timeout') {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.IFRAME_REQUEST_TIMEOUT, 'error');
                            } else if (reason === 'unverified_domain') {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.UNVERIFIED_DOMAIN, 'error');
                            }
                        },
                        getActiveCaipNetwork: (namespace)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])(namespace),
                        getCaipNetworks: (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(namespace)
                    });
                }
                return Promise.resolve(this.provider);
            },
            async getChainId () {
                const provider = await this.getProvider();
                const { chainId } = await provider.getChainId();
                return parseChainId(chainId);
            },
            async isAuthorized () {
                const activeChain = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const isActiveChainEvm = activeChain === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM;
                const isAnyAuthConnected = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS.some((chain)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(chain) === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH);
                if (isAnyAuthConnected && !isActiveChainEvm) {
                    return false;
                }
                const provider = await this.getProvider();
                return Promise.resolve(provider.getLoginEmailUsed());
            },
            async switchChain ({ chainId }) {
                try {
                    const chain = config.chains.find((c)=>c.id === chainId);
                    if (!chain) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new Error('chain not found on connector.'));
                    }
                    const provider = await this.getProvider();
                    const preferredAccountType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])('eip155');
                    const response = await provider.connect({
                        chainId,
                        preferredAccountType
                    });
                    currentAccounts = response?.accounts?.map((a)=>a.address) || [
                        response.address
                    ];
                    config.emitter.emit('change', {
                        chainId: Number(chainId),
                        accounts: currentAccounts
                    });
                    return chain;
                } catch (error) {
                    if (error instanceof Error) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
                    }
                    throw error;
                }
            },
            onAccountsChanged (accounts) {
                if (accounts.length === 0) {
                    this.onDisconnect();
                } else {
                    config.emitter.emit('change', {
                        accounts: accounts.map(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])
                    });
                }
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            async onDisconnect (_error) {
                const provider = await this.getProvider();
                await provider.disconnect();
            }
        }));
} //# sourceMappingURL=AuthConnector.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "walletConnect",
    ()=>walletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/errors/connector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@walletconnect/universal-provider/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletConnectUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/WalletConnectUtil.js [app-client] (ecmascript)");
;
;
;
;
;
walletConnect.type = 'walletConnect';
function walletConnect(parameters) {
    const isNewChainsStale = parameters.isNewChainsStale ?? true;
    let provider_;
    let accountsChanged;
    let chainChanged;
    let connect;
    let displayUri;
    let sessionDelete;
    let disconnect;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            id: 'walletConnect',
            name: 'WalletConnect',
            type: walletConnect.type,
            provider: parameters.universalProvider,
            async setup () {
                const provider = await this.getProvider().catch(()=>null);
                if (!provider) {
                    return;
                }
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
                if (!sessionDelete) {
                    sessionDelete = this.onSessionDelete.bind(this);
                    provider.on('session_delete', sessionDelete);
                }
            },
            async connect ({ ...rest } = {}) {
                try {
                    const caipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks();
                    const provider = await this.getProvider();
                    if (!provider) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                    }
                    if (!displayUri) {
                        displayUri = this.onDisplayUri;
                        provider.on('display_uri', displayUri);
                    }
                    const isChainsStale = await this.isChainsStale();
                    if (provider.session && isChainsStale) {
                        await provider.disconnect();
                    }
                    const universalProviderConfigOverride = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.universalProviderConfigOverride;
                    if (!provider.session || isChainsStale) {
                        const namespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletConnectUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].createNamespaces(caipNetworks, universalProviderConfigOverride);
                        await provider.connect({
                            optionalNamespaces: namespaces,
                            ...'pairingTopic' in rest ? {
                                pairingTopic: rest.pairingTopic
                            } : {}
                        });
                        this.setRequestedChainsIds(caipNetworks.map((x)=>Number(x.id)));
                    }
                    const accounts = await this.getAccounts();
                    const requestChainId = await this.getChainId();
                    const chains = provider.session?.namespaces?.['eip155']?.chains;
                    const isRequestedChainSupported = chains?.some((chain)=>Number(chain.split(':')[1]) === requestChainId);
                    let currentChainId = 1;
                    if (isRequestedChainSupported) {
                        currentChainId = requestChainId;
                    } else if (chains?.[0]) {
                        currentChainId = Number(chains[0].split(':')[1]);
                    }
                    if (displayUri) {
                        provider.removeListener('display_uri', displayUri);
                        displayUri = undefined;
                    }
                    if (connect) {
                        provider.removeListener('connect', connect);
                        connect = undefined;
                    }
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                    if (!sessionDelete) {
                        sessionDelete = this.onSessionDelete.bind(this);
                        provider.on('session_delete', sessionDelete);
                    }
                    const defaultChain = universalProviderConfigOverride?.defaultChain;
                    provider.setDefaultChain(defaultChain ?? `eip155:${currentChainId}`);
                    return {
                        accounts,
                        chainId: currentChainId
                    };
                } catch (error) {
                    if (/(user rejected|connection request reset)/i.test(error?.message)) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    }
                    throw error;
                }
            },
            async disconnect () {
                const provider = await this.getProvider();
                try {
                    await provider?.disconnect();
                } catch (error) {
                    if (!/No matching key/i.test(error.message)) {
                        throw error;
                    }
                } finally{
                    if (chainChanged) {
                        provider?.removeListener('chainChanged', chainChanged);
                        chainChanged = undefined;
                    }
                    if (disconnect) {
                        provider?.removeListener('disconnect', disconnect);
                        disconnect = undefined;
                    }
                    if (!connect) {
                        connect = this.onConnect.bind(this);
                        provider?.on('connect', connect);
                    }
                    if (accountsChanged) {
                        provider?.removeListener('accountsChanged', accountsChanged);
                        accountsChanged = undefined;
                    }
                    if (sessionDelete) {
                        provider?.removeListener('session_delete', sessionDelete);
                        sessionDelete = undefined;
                    }
                    this.setRequestedChainsIds([]);
                }
            },
            async getAccounts () {
                const provider = await this.getProvider();
                if (!provider?.session?.namespaces) {
                    return [];
                }
                const accountsList = provider?.session?.namespaces[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM]?.accounts;
                const accounts = accountsList?.map((account)=>account.split(':')[2]) ?? [];
                const accountsAdded = new Set();
                const deduplicatedAccounts = accounts.filter((account)=>{
                    const lowerCasedAccount = account?.toLowerCase();
                    if (accountsAdded.has(lowerCasedAccount)) {
                        return false;
                    }
                    accountsAdded.add(lowerCasedAccount);
                    return true;
                });
                return deduplicatedAccounts;
            },
            async getProvider ({ chainId } = {}) {
                if (!provider_) {
                    provider_ = parameters.universalProvider;
                    provider_?.events.setMaxListeners(Number.POSITIVE_INFINITY);
                }
                const activeNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveNamespace();
                const currentChainId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork()?.id;
                if (chainId && currentChainId !== chainId && activeNamespace) {
                    const storedCaipNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getStoredActiveCaipNetworkId();
                    const appKitCaipNetworks = activeNamespace ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(activeNamespace) : [];
                    const storedCaipNetwork = appKitCaipNetworks?.find((n)=>n.id === storedCaipNetworkId);
                    if (storedCaipNetwork && storedCaipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
                        await this.switchChain?.({
                            chainId: Number(storedCaipNetwork.id)
                        });
                    }
                }
                return provider_;
            },
            async getChainId () {
                const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM)?.id;
                if (chainId) {
                    return chainId;
                }
                const provider = await this.getProvider();
                const chain = provider.session?.namespaces[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM]?.chains?.[0];
                const network = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks().find((c)=>c.id === chain);
                return network?.id;
            },
            async isAuthorized () {
                try {
                    const [accounts, provider] = await Promise.all([
                        this.getAccounts(),
                        this.getProvider()
                    ]);
                    if (!accounts.length) {
                        return false;
                    }
                    const isChainsStale = await this.isChainsStale();
                    if (isChainsStale && provider.session) {
                        await provider.disconnect().catch(()=>{});
                        return false;
                    }
                    return true;
                } catch  {
                    return false;
                }
            },
            async switchChain ({ addEthereumChainParameter, chainId }) {
                const provider = await this.getProvider();
                if (!provider) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                }
                const chainToSwitch = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks().find((x)=>x.id === chainId);
                if (!chainToSwitch) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]());
                }
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                            {
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId)
                            }
                        ]
                    });
                    if (chainToSwitch?.caipNetworkId) {
                        provider.setDefaultChain(chainToSwitch?.caipNetworkId);
                    }
                    config.emitter.emit('change', {
                        chainId: Number(chainId)
                    });
                    const requestedChains = await this.getRequestedChainsIds();
                    this.setRequestedChainsIds([
                        ...requestedChains,
                        chainId
                    ]);
                    return {
                        ...chainToSwitch,
                        id: chainToSwitch.id
                    };
                } catch (err) {
                    const error = err;
                    if (/(?:user rejected)/iu.test(error.message)) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    }
                    try {
                        let blockExplorerUrls;
                        if (addEthereumChainParameter?.blockExplorerUrls) {
                            blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                        } else {
                            blockExplorerUrls = chainToSwitch.blockExplorers?.default.url ? [
                                chainToSwitch.blockExplorers?.default.url
                            ] : [];
                        }
                        const rpcUrls = chainToSwitch.rpcUrls?.['chainDefault']?.http || [];
                        const addEthereumChain = {
                            blockExplorerUrls,
                            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId),
                            chainName: chainToSwitch.name,
                            iconUrls: addEthereumChainParameter?.iconUrls,
                            nativeCurrency: chainToSwitch.nativeCurrency,
                            rpcUrls
                        };
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                addEthereumChain
                            ]
                        });
                        const requestedChains = await this.getRequestedChainsIds();
                        this.setRequestedChainsIds([
                            ...requestedChains,
                            chainId
                        ]);
                        return {
                            ...chainToSwitch,
                            id: chainToSwitch.id
                        };
                    } catch (e) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](e);
                    }
                }
            },
            onAccountsChanged (accounts) {
                if (accounts.length === 0) {
                    this.onDisconnect();
                } else {
                    config.emitter.emit('change', {
                        accounts: accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x))
                    });
                }
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            onConnect (_connectInfo) {
                this.setRequestedChainsIds(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks().map((x)=>Number(x.id)));
            },
            async onDisconnect (_error) {
                this.setRequestedChainsIds([]);
                config.emitter.emit('disconnect');
                const provider = await this.getProvider();
                if (accountsChanged) {
                    provider.removeListener('accountsChanged', accountsChanged);
                    accountsChanged = undefined;
                }
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                if (sessionDelete) {
                    provider.removeListener('session_delete', sessionDelete);
                    sessionDelete = undefined;
                }
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
            },
            onDisplayUri (uri) {
                config.emitter.emit('message', {
                    type: 'display_uri',
                    data: uri
                });
            },
            onSessionDelete () {
                this.onDisconnect();
            },
            getNamespaceChainsIds () {
                if (!provider_?.session?.namespaces) {
                    return [];
                }
                const accounts = provider_?.session?.namespaces[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM]?.accounts;
                const chainIds = accounts?.map((account)=>Number.parseInt(account.split(':')[1] ?? '')) ?? [];
                return chainIds;
            },
            async getRequestedChainsIds () {
                const chainIds = await config.storage?.getItem(this.requestedChainsStorageKey) ?? [];
                return [
                    ...new Set(chainIds)
                ];
            },
            async isChainsStale () {
                if (!isNewChainsStale) {
                    return false;
                }
                const connectorChains = config.chains.map((x)=>x.id);
                const namespaceChains = this.getNamespaceChainsIds();
                if (namespaceChains.length && !namespaceChains.some((id)=>connectorChains.includes(id))) {
                    return false;
                }
                const requestedChains = await this.getRequestedChainsIds();
                return !connectorChains.every((id)=>requestedChains.includes(Number(id)));
            },
            async setRequestedChainsIds (chains) {
                await config.storage?.setItem(this.requestedChainsStorageKey, chains);
            },
            get requestedChainsStorageKey () {
                return `${this.id}.requestedChains`;
            }
        }));
} //# sourceMappingURL=WalletConnectConnector.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/utils/LimitterUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LimitterUtil",
    ()=>LimitterUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
;
;
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    pendingTransactions: 0
});
const LimitterUtil = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    increase (value) {
        state[value] += 1;
    },
    decrease (value) {
        state[value] -= 1;
    },
    reset (value) {
        state[value] = 0;
    }
}; //# sourceMappingURL=LimitterUtil.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/utils/helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBaseAccountConnector",
    ()=>getBaseAccountConnector,
    "getEmailCaipNetworks",
    ()=>getEmailCaipNetworks,
    "getSafeConnector",
    ()=>getSafeConnector,
    "getWalletConnectCaipNetworks",
    ()=>getWalletConnectCaipNetworks,
    "parseWalletCapabilities",
    ()=>parseWalletCapabilities,
    "requireCaipAddress",
    ()=>requireCaipAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@walletconnect/universal-provider/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/PresetsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletConnectUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/WalletConnectUtil.js [app-client] (ecmascript)");
;
;
;
;
async function getWalletConnectCaipNetworks(connector) {
    if (!connector) {
        throw new Error('WagmiAdapter:getApprovedCaipNetworks - connector is undefined');
    }
    const provider = await connector?.getProvider();
    const approvedCaipNetworkIds = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletConnectUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].getChainsFromNamespaces(provider?.session?.namespaces);
    return {
        supportsAllNetworks: false,
        approvedCaipNetworkIds
    };
}
function getEmailCaipNetworks() {
    return {
        supportsAllNetworks: true,
        approvedCaipNetworkIds: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].WalletConnectRpcChainIds.map((id)=>`${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].EIP155}:${id}`)
    };
}
function requireCaipAddress(caipAddress) {
    if (!caipAddress) {
        throw new Error('No CAIP address provided');
    }
    const account = caipAddress.split(':')[2];
    if (!account) {
        throw new Error('Invalid CAIP address');
    }
    return account;
}
function parseWalletCapabilities(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        throw new Error('Error parsing wallet capabilities');
    }
}
async function getSafeConnector(connectors) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isSafeApp()) {
        const { safe } = await __turbopack_context__.A("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/connectors/dist/esm/exports/index.js [app-client] (ecmascript, async loader)");
        if (safe && !connectors.some((c)=>c.type === 'safe')) {
            const safeConnector = safe();
            return safeConnector;
        }
    }
    return null;
}
async function getBaseAccountConnector(connectors) {
    try {
        const { baseAccount } = await __turbopack_context__.A("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/connectors/dist/esm/exports/index.js [app-client] (ecmascript, async loader)");
        if (baseAccount && !connectors.some((c)=>c.id === 'baseAccount')) {
            return baseAccount();
        }
    } catch (error) {
        console.error('Failed to import Coinbase Wallet SDK:', error);
    }
    return null;
} //# sourceMappingURL=helpers.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WagmiAdapter",
    ()=>WagmiAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/connect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getConnection__as__getAccount$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/getConnection.js [app-client] (ecmascript) <export getConnection as getAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/getBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/getConnections.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$prepareTransactionRequest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/prepareTransactionRequest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$reconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/reconnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$signMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/signMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$switchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/switchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$disconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/disconnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$estimateGas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/estimateGas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$sendTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/sendTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$writeContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/writeContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$waitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/waitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__watchConnection__as__watchAccount$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/watchConnection.js [app-client] (ecmascript) <export watchConnection as watchAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/watchConnections.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/watchConnectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchPendingTransactions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@wagmi/core/dist/esm/actions/watchPendingTransactions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/ErrorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-common/dist/esm/src/utils/PresetsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AdapterController$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AdapterController/ChainAdapterBlueprint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AdapterController$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AdapterController/WalletConnectConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-utils/dist/esm/src/CaipNetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$connectors$2f$AuthConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/connectors/AuthConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$utils$2f$LimitterUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/utils/LimitterUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$utils$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/utils/helpers.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
const DEFAULT_PENDING_TRANSACTIONS_FILTER = {
    enable: false,
    pollingInterval: 30_000
};
class WagmiAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AdapterController$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdapterBlueprint"] {
    constructor(configParams){
        const networks = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetworks(configParams.networks, {
            projectId: configParams.projectId,
            customNetworkImageUrls: {},
            customRpcUrls: configParams.customRpcUrls
        });
        super();
        this.balancePromises = {};
        this.namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM;
        this.adapterType = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ADAPTER_TYPES.WAGMI;
        this.projectId = configParams.projectId;
        this.pendingTransactionsFilter = {
            ...DEFAULT_PENDING_TRANSACTIONS_FILTER,
            ...configParams.pendingTransactionsFilter ?? {}
        };
        this.createConfig({
            ...configParams,
            networks
        });
        this.checkChainId();
    }
    construct(_options) {
        this.checkChainId();
        this.setupWatchers();
    }
    async getAccounts(params) {
        const connector = this.getWagmiConnector(params.id);
        if (!connector) {
            return {
                accounts: []
            };
        }
        if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
            const provider = await connector.getProvider();
            if (!provider?.user) {
                return {
                    accounts: []
                };
            }
            const { address, accounts } = provider.user;
            return Promise.resolve({
                accounts: (accounts || [
                    {
                        address,
                        type: 'eoa'
                    }
                ]).map((account)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount('eip155', account.address, account.type))
            });
        }
        const { addresses, address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getConnection__as__getAccount$3e$__["getAccount"])(this.wagmiConfig);
        return Promise.resolve({
            accounts: [
                ...new Set(addresses || [
                    address
                ])
            ]?.map((val)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount('eip155', val || '', 'eoa'))
        });
    }
    checkChainId() {
        const { chainId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getConnection__as__getAccount$3e$__["getAccount"])(this.wagmiConfig);
        if (chainId) {
            this.emit('switchNetwork', {
                chainId
            });
        }
    }
    getWagmiConnector(id) {
        return this.wagmiConfig.connectors.find((c)=>c.id === id);
    }
    createConfig(configParams) {
        this.wagmiChains = configParams.networks.filter((caipNetwork)=>caipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM);
        const transports = {};
        const connectors = [
            ...configParams.connectors ?? []
        ];
        this.wagmiChains.forEach((element)=>{
            const fromTransportProp = configParams.transports?.[element.id];
            const caipNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].getCaipNetworkId(element);
            if (fromTransportProp) {
                transports[element.id] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendWagmiTransports(element, configParams.projectId, fromTransportProp);
            } else {
                transports[element.id] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].getViemTransport(element, configParams.projectId, configParams.customRpcUrls?.[caipNetworkId]);
            }
        });
        this.wagmiConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
            ...configParams,
            chains: this.wagmiChains,
            connectors,
            transports
        });
    }
    setupWatchPendingTransactions() {
        if (!this.pendingTransactionsFilter.enable || this.unwatchPendingTransactions) {
            return;
        }
        this.unwatchPendingTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchPendingTransactions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchPendingTransactions"])(this.wagmiConfig, {
            pollingInterval: this.pendingTransactionsFilter.pollingInterval,
            onError: ()=>{},
            onTransactions: ()=>{
                this.emit('pendingTransactions');
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$utils$2f$LimitterUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitterUtil"].increase('pendingTransactions');
            }
        });
        const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$utils$2f$LimitterUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitterUtil"].subscribeKey('pendingTransactions', (val)=>{
            if (val >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].LIMITS.PENDING_TRANSACTIONS) {
                this.unwatchPendingTransactions?.();
                unsubscribe();
            }
        });
    }
    setupWatchers() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchConnections"])(this.wagmiConfig, {
            onChange: (connections)=>{
                this.clearConnections();
                this.addConnection(...connections.map((connection)=>{
                    const caipNetwork = this.getCaipNetworks().find((network)=>network.id === connection.chainId);
                    const isAuth = connection.connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
                    return {
                        accounts: connection.accounts.map((account)=>({
                                address: this.toChecksummedAddress(account)
                            })),
                        caipNetwork,
                        connectorId: connection.connector.id,
                        auth: isAuth ? {
                            name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedSocialProvider(),
                            username: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedSocialUsername()
                        } : undefined
                    };
                }));
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__watchConnection__as__watchAccount$3e$__["watchAccount"])(this.wagmiConfig, {
            onChange: (accountData, prevAccountData)=>{
                if (accountData.status === 'disconnected' && prevAccountData.address) {
                    this.emit('disconnect');
                }
                if (accountData?.chainId && accountData?.chainId !== prevAccountData?.chainId) {
                    this.emit('switchNetwork', {
                        chainId: accountData.chainId
                    });
                }
                if (accountData.status === 'connected') {
                    const hasAccountChanged = accountData.address !== prevAccountData?.address;
                    const hasConnectorChanged = accountData.connector.id !== prevAccountData.connector?.id;
                    const hasConnectionStatusChanged = prevAccountData.status !== 'connected';
                    if (hasAccountChanged || hasConnectorChanged || hasConnectionStatusChanged) {
                        this.setupWatchPendingTransactions();
                        this.handleAccountChanged({
                            address: accountData.address,
                            chainId: accountData.chainId,
                            connector: accountData.connector
                        });
                    }
                }
            }
        });
    }
    async addThirdPartyConnectors() {
        const thirdPartyConnectors = [];
        const { enableCoinbase: isCoinbaseEnabled } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state || {};
        if (isCoinbaseEnabled !== false) {
            const baseAccountConnector = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$utils$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBaseAccountConnector"])(this.wagmiConfig.connectors);
            if (baseAccountConnector) {
                thirdPartyConnectors.push(baseAccountConnector);
            }
        }
        const safeConnector = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$utils$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnector"])(this.wagmiConfig.connectors);
        if (safeConnector) {
            thirdPartyConnectors.push(safeConnector);
        }
        await Promise.all(thirdPartyConnectors.map((connector)=>{
            const cnctr = this.configureInternalConnector(connector);
            return this.addWagmiConnector(cnctr);
        }));
    }
    addWagmiConnectors() {
        const customConnectors = [];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableInjected !== false) {
            customConnectors.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injected"])({
                shimDisconnect: true
            }));
        }
        const { features, remoteFeatures, projectId, enableAuthLogger: isAuthLoggerEnabled } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const isEmailEnabled = remoteFeatures?.email ?? features?.email ?? true;
        const socials = remoteFeatures?.socials ?? features?.socials;
        const isSocialsEnabled = Array.isArray(socials) && socials?.length > 0;
        if (isEmailEnabled || isSocialsEnabled) {
            customConnectors.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$connectors$2f$AuthConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authConnector"])({
                chains: this.wagmiChains,
                options: {
                    projectId,
                    enableAuthLogger: isAuthLoggerEnabled
                }
            }));
        }
        customConnectors.forEach((connector)=>{
            this.configureInternalConnector(connector);
        });
    }
    configureInternalConnector(connector) {
        const cnctr = this.wagmiConfig._internal.connectors.setup(connector);
        this.wagmiConfig._internal.connectors.setState((prev)=>[
                ...prev,
                cnctr
            ]);
        return cnctr;
    }
    async handleAccountChanged({ address, chainId, connector }) {
        if (!this.namespace) {
            throw new Error('WagmiAdapter:handleAccountChanged - namespace is required');
        }
        const provider = await connector.getProvider().catch(()=>undefined);
        this.emit('accountChanged', {
            address: this.toChecksummedAddress(address),
            chainId,
            connector: {
                id: connector.id,
                name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorNamesMap[connector.id] ?? connector.name,
                imageId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[connector.id],
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorTypesMap[connector.type] ?? 'EXTERNAL',
                info: connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.INJECTED ? undefined : {
                    rdns: connector.id
                },
                provider,
                chain: this.namespace,
                chains: []
            }
        });
    }
    async writeSolanaTransaction() {
        return Promise.resolve({
            hash: ''
        });
    }
    async signMessage(params) {
        try {
            const signature = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$signMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signMessage"])(this.wagmiConfig, {
                message: params.message,
                account: params.address
            });
            return {
                signature
            };
        } catch (error) {
            throw new Error('WagmiAdapter:signMessage - Sign message failed');
        }
    }
    async sendTransaction(params) {
        const { chainId, address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getConnection__as__getAccount$3e$__["getAccount"])(this.wagmiConfig);
        const wagmiChain = this.wagmiChains?.find((chain)=>chain.id === chainId);
        const txParams = {
            account: address,
            to: params.to,
            value: Number.isNaN(Number(params.value)) ? BigInt(0) : BigInt(params.value),
            gas: params.gas ? BigInt(params.gas) : undefined,
            gasPrice: params.gasPrice ? BigInt(params.gasPrice) : undefined,
            data: params.data,
            chain: wagmiChain,
            type: 'legacy',
            parameters: [
                'nonce'
            ]
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$prepareTransactionRequest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareTransactionRequest"])(this.wagmiConfig, txParams);
        const tx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$sendTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendTransaction"])(this.wagmiConfig, txParams);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$waitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitForTransactionReceipt"])(this.wagmiConfig, {
            hash: tx,
            timeout: 25000
        });
        return {
            hash: tx
        };
    }
    async writeContract(params) {
        const { caipNetwork, ...data } = params;
        const chainId = Number(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].caipNetworkIdToNumber(caipNetwork.caipNetworkId));
        const wagmiChain = this.wagmiChains?.find((chain)=>chain.id === chainId);
        const tx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$writeContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeContract"])(this.wagmiConfig, {
            chain: wagmiChain,
            address: data.tokenAddress,
            account: data.fromAddress,
            abi: data.abi,
            functionName: data.method,
            args: data.args,
            __mode: 'prepared'
        });
        return {
            hash: tx
        };
    }
    async estimateGas(params) {
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$estimateGas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateGas"])(this.wagmiConfig, {
                account: params.address,
                to: params.to,
                data: params.data,
                type: 'legacy'
            });
            return {
                gas: result
            };
        } catch (error) {
            throw new Error('WagmiAdapter:estimateGas - error estimating gas');
        }
    }
    parseUnits(params) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(params.value, params.decimals);
    }
    formatUnits(params) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(params.value, params.decimals);
    }
    async addWagmiConnector(connector) {
        if (!this.namespace) {
            throw new Error('WagmiAdapter:addWagmiConnector - namespace is required');
        }
        const { enableEIP6963: isEIP6963Enabled } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state || {};
        if (connector.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.INJECTED && isEIP6963Enabled === false) {
            return;
        }
        if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH || connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT) {
            return;
        }
        let provider = undefined;
        if (connector.id !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.BASE_ACCOUNT) {
            provider = await connector.getProvider().catch(()=>undefined);
        }
        const customConnectorImages = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.connectorImages;
        this.addConnector({
            id: connector.id,
            explorerId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorExplorerIds[connector.id] ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorExplorerIds[connector.name],
            imageUrl: customConnectorImages?.[connector.id] ?? connector.icon,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorNamesMap[connector.id] ?? connector.name,
            imageId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[connector.id],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorTypesMap[connector.type] ?? 'EXTERNAL',
            info: connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.INJECTED ? undefined : {
                rdns: connector.id
            },
            provider,
            chain: this.namespace,
            chains: []
        });
    }
    async syncConnectors() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$watchConnectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchConnectors"])(this.wagmiConfig, {
            onChange: (connectors)=>{
                connectors.forEach((connector)=>this.addWagmiConnector(connector));
            }
        });
        this.addWagmiConnectors();
        await Promise.all(this.wagmiConfig.connectors.map((connector)=>this.addWagmiConnector(connector)));
        await this.addThirdPartyConnectors();
    }
    async syncConnections() {
        const wagmiConnectors = this.connectors.filter((c)=>{
            const { hasDisconnected, hasConnected } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].getConnectorStorageInfo(c.id, this.namespace);
            return !hasDisconnected && hasConnected;
        }).map((connector)=>this.getWagmiConnector(connector.id)).filter(Boolean);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$reconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reconnect"])(this.wagmiConfig, {
            connectors: wagmiConnectors
        });
    }
    async syncConnection(params) {
        const { id, chainId } = params;
        const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
        const connection = connections.find((c)=>c.connector.id === id);
        const connector = this.getWagmiConnector(id);
        const provider = await connector?.getProvider();
        const isSafeApp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isSafeApp();
        if (isSafeApp && id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.SAFE && !connection?.accounts.length) {
            const safeAppConnector = this.getWagmiConnector('safe');
            if (safeAppConnector) {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connect"])(this.wagmiConfig, {
                    connector: safeAppConnector,
                    chainId: Number(chainId)
                });
                const safeProvider = await safeAppConnector.getProvider();
                return {
                    chainId: Number(chainId),
                    address: this.toChecksummedAddress(res.accounts[0]),
                    provider: safeProvider,
                    type: connection?.connector.type?.toUpperCase(),
                    id: connection?.connector.id
                };
            }
        }
        return {
            chainId: Number(connection?.chainId),
            address: this.toChecksummedAddress(connection?.accounts[0]),
            provider,
            type: connection?.connector.type?.toUpperCase(),
            id: connection?.connector.id
        };
    }
    async connectWalletConnect(chainId) {
        try {
            const walletConnectConnector = this.getWalletConnectConnector();
            await walletConnectConnector.authenticate();
            const wagmiConnector = this.getWagmiConnector('walletConnect');
            if (!wagmiConnector) {
                throw new Error('UniversalAdapter:connectWalletConnect - connector not found');
            }
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connect"])(this.wagmiConfig, {
                connector: wagmiConnector,
                chainId: chainId ? Number(chainId) : undefined
            });
            if (res.chainId !== Number(chainId)) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$switchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["switchChain"])(this.wagmiConfig, {
                    chainId: res.chainId
                });
            }
            return {
                clientId: await walletConnectConnector.provider.client.core.crypto.getClientId()
            };
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"]) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].isUserRejectedRequestError(err)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
            }
            throw err;
        }
    }
    async connect(params) {
        try {
            const { id, address, provider, type, info, chainId, socialUri } = params;
            const connector = this.getWagmiConnector(id);
            if (!connector) {
                throw new Error('connectionControllerClient:connectExternal - connector is undefined');
            }
            if (provider && info && connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.EIP6963) {
                connector.setEip6963Wallet?.({
                    provider,
                    info
                });
            }
            const connection = this.wagmiConfig.state?.connections?.get(connector.uid);
            if (connection) {
                await this.wagmiConfig.storage?.setItem('recentConnectorId', connector.id);
                const sortedAccounts = [
                    ...connection.accounts
                ].sort((a, b)=>{
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(a, address)) {
                        return -1;
                    }
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(b, address)) {
                        return 1;
                    }
                    return 0;
                });
                this.wagmiConfig?.setState((x)=>({
                        ...x,
                        connections: new Map(x.connections).set(connector.uid, {
                            accounts: sortedAccounts,
                            chainId: connection.chainId,
                            connector: connection.connector
                        }),
                        current: connector.uid,
                        status: 'connected'
                    }));
                return {
                    address: this.toChecksummedAddress(sortedAccounts[0]),
                    chainId: connection.chainId,
                    provider: provider,
                    type: type,
                    id
                };
            }
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connect"])(this.wagmiConfig, {
                connector,
                chainId: chainId ? Number(chainId) : undefined,
                socialUri
            });
            const resolvedProvider = provider ?? await connector.getProvider();
            return {
                address: this.toChecksummedAddress(res.accounts[0]),
                chainId: res.chainId,
                provider: resolvedProvider,
                type: type,
                id
            };
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"]) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].isUserRejectedRequestError(err)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
            }
            throw err;
        }
    }
    get connections() {
        return Array.from(this.wagmiConfig.state.connections.values()).map((connection)=>({
                accounts: connection.accounts.map((account)=>({
                        address: this.toChecksummedAddress(account)
                    })),
                connectorId: connection.connector.id
            }));
    }
    async reconnect(params) {
        const { id } = params;
        const connector = this.getWagmiConnector(id);
        if (!connector) {
            throw new Error('connectionControllerClient:connectExternal - connector is undefined');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$reconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reconnect"])(this.wagmiConfig, {
            connectors: [
                connector
            ]
        });
    }
    async getBalance(params) {
        const address = params.address;
        const caipNetwork = this.getCaipNetworks().find((network)=>network.id === params.chainId);
        if (!address) {
            return Promise.resolve({
                balance: '0.00',
                symbol: 'ETH'
            });
        }
        if (caipNetwork && this.wagmiConfig) {
            const caipAddress = `${caipNetwork.caipNetworkId}:${params.address}`;
            const cachedPromise = this.balancePromises[caipAddress];
            if (cachedPromise) {
                return cachedPromise;
            }
            const cachedBalance = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getNativeBalanceCacheForCaipAddress(caipAddress);
            if (cachedBalance) {
                return {
                    balance: cachedBalance.balance,
                    symbol: cachedBalance.symbol
                };
            }
            this.balancePromises[caipAddress] = new Promise(async (resolve)=>{
                try {
                    const chainId = Number(params.chainId);
                    const balance = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBalance"])(this.wagmiConfig, {
                        address: params.address,
                        chainId,
                        token: params.tokens?.[caipNetwork.caipNetworkId]?.address
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateNativeBalanceCache({
                        caipAddress,
                        balance: balance.formatted,
                        symbol: balance.symbol,
                        timestamp: Date.now()
                    });
                    resolve({
                        balance: balance.formatted,
                        symbol: balance.symbol
                    });
                } catch (error) {
                    console.warn('Appkit:WagmiAdapter:getBalance - Error getting balance', error);
                    resolve({
                        balance: '0.00',
                        symbol: 'ETH'
                    });
                }
            }).finally(()=>{
                delete this.balancePromises[caipAddress];
            });
            return this.balancePromises[caipAddress] || {
                balance: '0.00',
                symbol: 'ETH'
            };
        }
        return {
            balance: '',
            symbol: ''
        };
    }
    getWalletConnectProvider() {
        return this.getWagmiConnector('walletConnect')?.['provider'];
    }
    async disconnect(params) {
        if (params.id) {
            const connector = this.getWagmiConnector(params.id);
            const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
            const connection = connections.find((c)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(c.connector.id, params.id));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$disconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disconnect"])(this.wagmiConfig, {
                connector
            });
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableReconnect === false) {
                this.deleteConnection(params.id);
            }
            if (connection) {
                return {
                    connections: [
                        {
                            accounts: connection.accounts.map((account)=>({
                                    address: this.toChecksummedAddress(account)
                                })),
                            connectorId: connection.connector.id
                        }
                    ]
                };
            }
            return {
                connections: []
            };
        }
        return this.disconnectAll();
    }
    async disconnectAll() {
        const wagmiConnections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
        const connections = await Promise.allSettled(wagmiConnections.map(async (connection)=>{
            const connector = this.getWagmiConnector(connection.connector.id);
            if (connector) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$disconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disconnect"])(this.wagmiConfig, {
                    connector
                });
            }
            return connection;
        }));
        this.wagmiConfig.state.connections.clear();
        return {
            connections: connections.filter((connection)=>connection.status === 'fulfilled').map(({ value: connection })=>({
                    accounts: connection.accounts.map((account)=>({
                            address: this.toChecksummedAddress(account)
                        })),
                    connectorId: connection.connector.id
                }))
        };
    }
    async switchNetwork(params) {
        const { caipNetwork } = params;
        const wagmiChain = this.wagmiConfig.chains.find((chain)=>chain.id.toString() === caipNetwork.id.toString());
        if (!wagmiChain) {
            throw new Error('connectionControllerClient:switchNetwork - wagmiChain is undefined');
        }
        const { name, nativeCurrency, rpcUrls, blockExplorers, id } = wagmiChain;
        const rpcUrl = caipNetwork.rpcUrls?.['chainDefault']?.http?.[0] ?? rpcUrls.default.http[0] ?? '';
        const blockExplorerUrl = blockExplorers?.default.url ?? caipNetwork.blockExplorers?.default?.url ?? '';
        const currency = nativeCurrency ?? caipNetwork.nativeCurrency;
        const chainName = name ?? caipNetwork.name;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$switchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["switchChain"])(this.wagmiConfig, {
            chainId: id,
            addEthereumChainParameter: {
                chainName,
                nativeCurrency: currency,
                rpcUrls: [
                    rpcUrl
                ],
                blockExplorerUrls: [
                    blockExplorerUrl
                ]
            }
        });
        await super.switchNetwork(params);
    }
    async getCapabilities(params) {
        if (!this.wagmiConfig) {
            throw new Error('connectionControllerClient:getCapabilities - wagmiConfig is undefined');
        }
        const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
        const connection = connections[0];
        const connector = connection ? this.getWagmiConnector(connection.connector.id) : null;
        if (!connector) {
            throw new Error('connectionControllerClient:getCapabilities - connector is undefined');
        }
        const provider = await connector.getProvider();
        if (!provider) {
            throw new Error('connectionControllerClient:getCapabilities - provider is undefined');
        }
        return await provider.request({
            method: 'wallet_getCapabilities',
            params: [
                params
            ]
        });
    }
    async grantPermissions(params) {
        if (!this.wagmiConfig) {
            throw new Error('connectionControllerClient:grantPermissions - wagmiConfig is undefined');
        }
        const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
        const connection = connections[0];
        const connector = connection ? this.getWagmiConnector(connection.connector.id) : null;
        if (!connector) {
            throw new Error('connectionControllerClient:grantPermissions - connector is undefined');
        }
        const provider = await connector.getProvider();
        if (!provider) {
            throw new Error('connectionControllerClient:grantPermissions - provider is undefined');
        }
        return provider.request({
            method: 'wallet_grantPermissions',
            params
        });
    }
    async revokePermissions(params) {
        if (!this.wagmiConfig) {
            throw new Error('connectionControllerClient:revokePermissions - wagmiConfig is undefined');
        }
        const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
        const connection = connections[0];
        const connector = connection ? this.getWagmiConnector(connection.connector.id) : null;
        if (!connector) {
            throw new Error('connectionControllerClient:revokePermissions - connector is undefined');
        }
        const provider = await connector.getProvider();
        if (!provider) {
            throw new Error('connectionControllerClient:revokePermissions - provider is undefined');
        }
        return provider.request({
            method: 'wallet_revokePermissions',
            params
        });
    }
    async walletGetAssets(params) {
        if (!this.wagmiConfig) {
            throw new Error('connectionControllerClient:walletGetAssets - wagmiConfig is undefined');
        }
        const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
        const connection = connections[0];
        const connector = connection ? this.getWagmiConnector(connection.connector.id) : null;
        if (!connector) {
            throw new Error('connectionControllerClient:walletGetAssets - connector is undefined');
        }
        const provider = await connector.getProvider();
        if (!provider) {
            throw new Error('connectionControllerClient:walletGetAssets - provider is undefined');
        }
        return provider.request({
            method: 'wallet_getAssets',
            params: [
                params
            ]
        });
    }
    setAuthProvider(authProvider) {
        if (!this.namespace) {
            throw new Error('WagmiAdapter:setAuthProvider - namespace is required');
        }
        this.addConnector({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
            type: 'AUTH',
            name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_NAMES.AUTH,
            provider: authProvider,
            imageId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH],
            chain: this.namespace,
            chains: []
        });
    }
    async setUniversalProvider(universalProvider) {
        universalProvider.on('connect', ()=>{
            const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$getConnections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConnections"])(this.wagmiConfig);
            const connector = this.getWagmiConnector('walletConnect');
            if (connector && !connections.find((c)=>c.connector.id === connector.id)) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === 'eip155') {
                    return;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$reconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reconnect"])(this.wagmiConfig, {
                    connectors: [
                        connector
                    ]
                });
            }
        });
        const walletConnectConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletConnect"])({
            universalProvider
        });
        this.configureInternalConnector(walletConnectConnector);
        this.addConnector(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AdapterController$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectConnector"]({
            provider: universalProvider,
            caipNetworks: this.getCaipNetworks(),
            namespace: 'eip155'
        }));
        return Promise.resolve();
    }
    toChecksummedAddress(address) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(address.toLowerCase());
    }
} //# sourceMappingURL=client.js.map
}),
]);

//# sourceMappingURL=a5473_%40reown_appkit-adapter-wagmi_dist_esm_src_16c1a830._.js.map