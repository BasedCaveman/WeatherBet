(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAbiItem",
    ()=>parseAbiItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/errors/abiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/signatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/structs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/utils.js [app-client] (ecmascript)");
;
;
;
;
function parseAbiItem(signature) {
    let abiItem;
    if (typeof signature === 'string') abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseSignature"])(signature);
    else {
        const structs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStructs"])(signature);
        const length = signature.length;
        for(let i = 0; i < length; i++){
            const signature_ = signature[i];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStructSignature"])(signature_)) continue;
            abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseSignature"])(signature_, structs);
            break;
        }
    }
    if (!abiItem) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAbiItemError"]({
        signature
    });
    return abiItem;
} //# sourceMappingURL=parseAbiItem.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/parseAbiParameter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAbiParameter",
    ()=>parseAbiParameter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiParameter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/signatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/structs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/utils.js [app-client] (ecmascript)");
;
;
;
;
function parseAbiParameter(param) {
    let abiParameter;
    if (typeof param === 'string') abiParameter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiParameter"])(param, {
        modifiers: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiers"]
    });
    else {
        const structs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStructs"])(param);
        const length = param.length;
        for(let i = 0; i < length; i++){
            const signature = param[i];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStructSignature"])(signature)) continue;
            abiParameter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiParameter"])(signature, {
                modifiers: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiers"],
                structs
            });
            break;
        }
    }
    if (!abiParameter) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiParameter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAbiParameterError"]({
        param
    });
    return abiParameter;
} //# sourceMappingURL=parseAbiParameter.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAbiParameters",
    ()=>parseAbiParameters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiParameter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/signatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/structs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/abitype/dist/esm/human-readable/runtime/utils.js [app-client] (ecmascript)");
;
;
;
;
;
function parseAbiParameters(params) {
    const abiParameters = [];
    if (typeof params === 'string') {
        const parameters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitParameters"])(params);
        const length = parameters.length;
        for(let i = 0; i < length; i++){
            abiParameters.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiParameter"])(parameters[i], {
                modifiers: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiers"]
            }));
        }
    } else {
        const structs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStructs"])(params);
        const length = params.length;
        for(let i = 0; i < length; i++){
            const signature = params[i];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStructSignature"])(signature)) continue;
            const parameters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitParameters"])(signature);
            const length = parameters.length;
            for(let k = 0; k < length; k++){
                abiParameters.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiParameter"])(parameters[k], {
                    modifiers: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modifiers"],
                    structs
                }));
            }
        }
    }
    if (abiParameters.length === 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiParameter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAbiParametersError"]({
        params
    });
    return abiParameters;
} //# sourceMappingURL=parseAbiParameters.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/legacy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MD5",
    ()=>MD5,
    "RIPEMD160",
    ()=>RIPEMD160,
    "SHA1",
    ()=>SHA1,
    "md5",
    ()=>md5,
    "ripemd160",
    ()=>ripemd160,
    "sha1",
    ()=>sha1
]);
/**

SHA1 (RFC 3174), MD5 (RFC 1321) and RIPEMD160 (RFC 2286) legacy, weak hash functions.
Don't use them in a new protocol. What "weak" means:

- Collisions can be made with 2^18 effort in MD5, 2^60 in SHA1, 2^80 in RIPEMD160.
- No practical pre-image attacks (only theoretical, 2^123.4)
- HMAC seems kinda ok: https://datatracker.ietf.org/doc/html/rfc6151
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/_md.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
/** Initial SHA1 state */ const SHA1_IV = /* @__PURE__ */ Uint32Array.from([
    0x67452301,
    0xefcdab89,
    0x98badcfe,
    0x10325476,
    0xc3d2e1f0
]);
// Reusable temporary buffer
const SHA1_W = /* @__PURE__ */ new Uint32Array(80);
class SHA1 extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    constructor(){
        super(64, 20, 8, false);
        this.A = SHA1_IV[0] | 0;
        this.B = SHA1_IV[1] | 0;
        this.C = SHA1_IV[2] | 0;
        this.D = SHA1_IV[3] | 0;
        this.E = SHA1_IV[4] | 0;
    }
    get() {
        const { A, B, C, D, E } = this;
        return [
            A,
            B,
            C,
            D,
            E
        ];
    }
    set(A, B, C, D, E) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
    }
    process(view, offset) {
        for(let i = 0; i < 16; i++, offset += 4)SHA1_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 80; i++)SHA1_W[i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
        // Compression function main loop, 80 rounds
        let { A, B, C, D, E } = this;
        for(let i = 0; i < 80; i++){
            let F, K;
            if (i < 20) {
                F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chi"])(B, C, D);
                K = 0x5a827999;
            } else if (i < 40) {
                F = B ^ C ^ D;
                K = 0x6ed9eba1;
            } else if (i < 60) {
                F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Maj"])(B, C, D);
                K = 0x8f1bbcdc;
            } else {
                F = B ^ C ^ D;
                K = 0xca62c1d6;
            }
            const T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(A, 5) + F + E + K + SHA1_W[i] | 0;
            E = D;
            D = C;
            C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(B, 30);
            B = A;
            A = T;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        this.set(A, B, C, D, E);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(SHA1_W);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
    }
}
const sha1 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA1());
/** Per-round constants */ const p32 = /* @__PURE__ */ Math.pow(2, 32);
const K = /* @__PURE__ */ Array.from({
    length: 64
}, (_, i)=>Math.floor(p32 * Math.abs(Math.sin(i + 1))));
/** md5 initial state: same as sha1, but 4 u32 instead of 5. */ const MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
// Reusable temporary buffer
const MD5_W = /* @__PURE__ */ new Uint32Array(16);
class MD5 extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    constructor(){
        super(64, 16, 8, true);
        this.A = MD5_IV[0] | 0;
        this.B = MD5_IV[1] | 0;
        this.C = MD5_IV[2] | 0;
        this.D = MD5_IV[3] | 0;
    }
    get() {
        const { A, B, C, D } = this;
        return [
            A,
            B,
            C,
            D
        ];
    }
    set(A, B, C, D) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
    }
    process(view, offset) {
        for(let i = 0; i < 16; i++, offset += 4)MD5_W[i] = view.getUint32(offset, true);
        // Compression function main loop, 64 rounds
        let { A, B, C, D } = this;
        for(let i = 0; i < 64; i++){
            let F, g, s;
            if (i < 16) {
                F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chi"])(B, C, D);
                g = i;
                s = [
                    7,
                    12,
                    17,
                    22
                ];
            } else if (i < 32) {
                F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chi"])(D, B, C);
                g = (5 * i + 1) % 16;
                s = [
                    5,
                    9,
                    14,
                    20
                ];
            } else if (i < 48) {
                F = B ^ C ^ D;
                g = (3 * i + 5) % 16;
                s = [
                    4,
                    11,
                    16,
                    23
                ];
            } else {
                F = C ^ (B | ~D);
                g = 7 * i % 16;
                s = [
                    6,
                    10,
                    15,
                    21
                ];
            }
            F = F + A + K[i] + MD5_W[g];
            A = D;
            D = C;
            C = B;
            B = B + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(F, s[i % 4]);
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        this.set(A, B, C, D);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(MD5_W);
    }
    destroy() {
        this.set(0, 0, 0, 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
    }
}
const md5 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new MD5());
// RIPEMD-160
const Rho160 = /* @__PURE__ */ Uint8Array.from([
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8
]);
const Id160 = /* @__PURE__ */ (()=>Uint8Array.from(new Array(16).fill(0).map((_, i)=>i)))();
const Pi160 = /* @__PURE__ */ (()=>Id160.map((i)=>(9 * i + 5) % 16))();
const idxLR = /* @__PURE__ */ (()=>{
    const L = [
        Id160
    ];
    const R = [
        Pi160
    ];
    const res = [
        L,
        R
    ];
    for(let i = 0; i < 4; i++)for (let j of res)j.push(j[i].map((k)=>Rho160[k]));
    return res;
})();
const idxL = /* @__PURE__ */ (()=>idxLR[0])();
const idxR = /* @__PURE__ */ (()=>idxLR[1])();
// const [idxL, idxR] = idxLR;
const shifts160 = /* @__PURE__ */ [
    [
        11,
        14,
        15,
        12,
        5,
        8,
        7,
        9,
        11,
        13,
        14,
        15,
        6,
        7,
        9,
        8
    ],
    [
        12,
        13,
        11,
        15,
        6,
        9,
        9,
        7,
        12,
        15,
        11,
        13,
        7,
        8,
        7,
        7
    ],
    [
        13,
        15,
        14,
        11,
        7,
        7,
        6,
        8,
        13,
        14,
        13,
        12,
        5,
        5,
        6,
        9
    ],
    [
        14,
        11,
        12,
        14,
        8,
        6,
        5,
        5,
        15,
        12,
        15,
        14,
        9,
        9,
        8,
        6
    ],
    [
        15,
        12,
        13,
        13,
        9,
        5,
        8,
        6,
        14,
        11,
        12,
        11,
        8,
        6,
        5,
        5
    ]
].map((i)=>Uint8Array.from(i));
const shiftsL160 = /* @__PURE__ */ idxL.map((idx, i)=>idx.map((j)=>shifts160[i][j]));
const shiftsR160 = /* @__PURE__ */ idxR.map((idx, i)=>idx.map((j)=>shifts160[i][j]));
const Kl160 = /* @__PURE__ */ Uint32Array.from([
    0x00000000,
    0x5a827999,
    0x6ed9eba1,
    0x8f1bbcdc,
    0xa953fd4e
]);
const Kr160 = /* @__PURE__ */ Uint32Array.from([
    0x50a28be6,
    0x5c4dd124,
    0x6d703ef3,
    0x7a6d76e9,
    0x00000000
]);
// It's called f() in spec.
function ripemd_f(group, x, y, z) {
    if (group === 0) return x ^ y ^ z;
    if (group === 1) return x & y | ~x & z;
    if (group === 2) return (x | ~y) ^ z;
    if (group === 3) return x & z | y & ~z;
    return x ^ (y | ~z);
}
// Reusable temporary buffer
const BUF_160 = /* @__PURE__ */ new Uint32Array(16);
class RIPEMD160 extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    constructor(){
        super(64, 20, 8, true);
        this.h0 = 0x67452301 | 0;
        this.h1 = 0xefcdab89 | 0;
        this.h2 = 0x98badcfe | 0;
        this.h3 = 0x10325476 | 0;
        this.h4 = 0xc3d2e1f0 | 0;
    }
    get() {
        const { h0, h1, h2, h3, h4 } = this;
        return [
            h0,
            h1,
            h2,
            h3,
            h4
        ];
    }
    set(h0, h1, h2, h3, h4) {
        this.h0 = h0 | 0;
        this.h1 = h1 | 0;
        this.h2 = h2 | 0;
        this.h3 = h3 | 0;
        this.h4 = h4 | 0;
    }
    process(view, offset) {
        for(let i = 0; i < 16; i++, offset += 4)BUF_160[i] = view.getUint32(offset, true);
        // prettier-ignore
        let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
        // Instead of iterating 0 to 80, we split it into 5 groups
        // And use the groups in constants, functions, etc. Much simpler
        for(let group = 0; group < 5; group++){
            const rGroup = 4 - group;
            const hbl = Kl160[group], hbr = Kr160[group]; // prettier-ignore
            const rl = idxL[group], rr = idxR[group]; // prettier-ignore
            const sl = shiftsL160[group], sr = shiftsR160[group]; // prettier-ignore
            for(let i = 0; i < 16; i++){
                const tl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
                al = el, el = dl, dl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(cl, 10) | 0, cl = bl, bl = tl; // prettier-ignore
            }
            // 2 loops are 10% faster
            for(let i = 0; i < 16; i++){
                const tr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
                ar = er, er = dr, dr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(cr, 10) | 0, cr = br, br = tr; // prettier-ignore
            }
        }
        // Add the compressed chunk to the current hash value
        this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(BUF_160);
    }
    destroy() {
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
        this.set(0, 0, 0, 0, 0);
    }
}
const ripemd160 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new RIPEMD160()); //# sourceMappingURL=legacy.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/ripemd160.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RIPEMD160",
    ()=>RIPEMD160,
    "ripemd160",
    ()=>ripemd160
]);
/**
 * RIPEMD-160 legacy hash function.
 * https://homes.esat.kuleuven.be/~bosselae/ripemd160.html
 * https://homes.esat.kuleuven.be/~bosselae/ripemd160/pdf/AB-9601/AB-9601.pdf
 * @module
 * @deprecated
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$legacy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/legacy.js [app-client] (ecmascript)");
;
const RIPEMD160 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$legacy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RIPEMD160"];
const ripemd160 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$legacy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ripemd160"]; //# sourceMappingURL=ripemd160.js.map
}),
"[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/hmac.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HMAC",
    ()=>HMAC,
    "hmac",
    ()=>hmac
]);
/**
 * HMAC: RFC2104 message authentication code.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/WeatherBet/node_modules/viem/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
class HMAC extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    constructor(hash, _key){
        super();
        this.finished = false;
        this.destroyed = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ahash"])(hash);
        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function') throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(pad);
    }
    update(buf) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$WeatherBet$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
const hmac = (hash, key, message)=>new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key)=>new HMAC(hash, key); //# sourceMappingURL=hmac.js.map
}),
]);

//# sourceMappingURL=a5473_82f44ee4._.js.map