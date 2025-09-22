const passport = require("passport")
const { Strategy: KakaoStrategy } = require("passport-kakao")
const User = require("../models/user")

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      // accessToken, refreshToken은 api에서 사용하기 때문에 이번에는 사용하지 않는다.
      async (accessToken, refreshToken, profile, done) => {
        // profile의 형태는 매번 바뀌기 때문에 로그로 확인
        console.log("profile", profile)
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          })
          if (exUser) {
            done(null, exUser)
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            })
            done(null, newUser)
          }
        } catch (error) {
          console.error(error)
          done()
        }
      }
    )
  )
}
