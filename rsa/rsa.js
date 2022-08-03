const crypto = require('crypto');
const math = require('mathjs');

const safeBits = 5;
//质数p
let p = Number(crypto.generatePrimeSync(safeBits, {bigint: true})); // 49597n
console.log(`p:${p}`);
//质数q
let q = Number(crypto.generatePrimeSync(safeBits, {bigint: true})); // 49597n
console.log(`q:${q}`);
//模N
let N = p * q;
console.log(`N:${N}`);
//欧拉函数
let phi = computeEuler(p, q);
console.log(`Φ(N)=${phi}`);
//公钥e，和欧拉函数互质
let e = findCoPrimeTo(phi);
console.log(`e:${e}`);
//私钥d，是e的模逆元
let d = findExGcd(e, phi);
console.log(`d: ${d}`);
//消息m
let m = 5;
console.log(`m:${m}`);
console.log(`m^ed:${rsa(m, e*d, N)}`);
//密文c
let c = rsa(m, e, N);
console.log(`c: ${c}`);
//解密原文
let m_recovered = rsa(c, d, N);
console.log(`m_recovered: ${m_recovered}`);

//签名s
let s = rsa(m, d, N);
console.log(`s:${s}`);
//验签
m_recovered = rsa(s, e, N);
console.log(`m_recovered: ${m_recovered}`);

function findCoPrimeTo(phi) {
    for (var i=2;i<phi;i++) {
        if (math.gcd(i, phi) == 1){
            return i;
        }
    }
    return 0;
}

function findExGcd(e, phi) {
    for (var i=2;i<phi;i++) {
        let mul = i*e;
        if (mul % phi == 1){
            return i;
        }
    }
    return 0;
}

function computeEuler(p, q){
    //欧拉函数的计算方式：https://zhuanlan.zhihu.com/p/151756874
    if (p === q){
        return p*(q-1)
    }
    //如果p ！= q，则(p-1)(q-1)
    return (p-1)*(q-1)
}

function rsa(m, c, N) {
    let ans = 1;
    for (var i = 0;i<c;i++){
        ans *= m;
        ans = math.mod(ans, N);
    }
    return ans;
}











