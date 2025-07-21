import dns from "dns/promises"

// lookup 메서드를 사용하여 도메인 이름을 IP 주소로 변환
const ip = await dns.lookup("gilbut.co.kr")
console.log("IP", ip)

// A 레코드를 사용하여 도메인 이름을 IP 주소로 변환 - ipv4 주소
const a = await dns.resolve("gilbut.co.kr", "A")
console.log("A", a)

// MX 레코드를 사용하여 도메인 이름의 메일 서버를 찾음 - 메일 서버 주소
const mx = await dns.resolve("gilbut.co.kr", "MX")
console.log("MX", mx)

// CNAME 레코드를 사용하여 도메인 이름의 별칭을 찾음 - 별칭, www가 붙은 주소는 별칭인 가능성이 높음
const cname = await dns.resolve("www.gilbut.co.kr", "CNAME")
console.log("CNAME", cname)

// ANY 레코드를 사용하여 도메인 이름의 모든 레코드를 찾음
const any = await dns.resolve("gilbut.co.kr", "ANY")
console.log("ANY", any)
