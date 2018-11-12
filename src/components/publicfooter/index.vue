<template>
    <div class="footer">
        <div class="main">
            <div class="logo">
                <a href="/home">
                    <img src="../../assets/images/shared/logo.png" alt="">
                </a>
            </div>
            <div class="contact-box clearboth">
                <div class="fl left">
                    <ul>
                        <li>
                            <a href="javascript:;">About Us</a>
                        </li>
                        <li>
                            <a href="javascript:;">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div class="fr right clearboth">
                    <ul class="fl">
                        <li>
                            <a href="javascript:;">Telegram</a>
                        </li>
                        <li>
                            <a href="javascript:;">Twitter</a>
                        </li>
                    </ul>
                    <ul class="fl">
                        <li>
                            <a href="javascript:;">Facebook</a>
                        </li>
                        <li>
                            <a href="javascript:;">Medium</a>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="copyright">Copyright Notice(2018)</p>
        </div>
    </div>
</template>
<style scoped lang="less">

.footer {
    position: relative;
    bottom: 0;
    width: 100%;
    background: #474849;
    color: #FFF;
    z-index: 10;
    padding: 30px 0 35px;
    .main {
        position: relative;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .logo {
        img {
            height: 22px;
        }
    }
    .copyright {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }
    .contact-box {
        ul {
            display: inline-block;
            li {
                padding-top: 16px;
                a {
                    padding-left: 26px;
                    color: #62a7f8;
                    line-height: 20px;
                    background: url("../../assets/images/shared/icon-fix.png") left -156px no-repeat;
                    -moz-transition: all 0.3s;
                    -o-transition: all 0.3s;
                    -webkit-transition: all 0.3s;
                    transition: all 0.3s;
                    &:hover{
                        color: #90c3ff
                    }
                }
            }
        }
        .left {
            ul {
                li {
                    &:last-of-type {
                        a {
                            background-position-y: -279px;
                        }
                    }
                }
            }
        }
        .right {
            ul {
                padding-left: 15px;
                &:first-of-type {
                    li {
                        &:first-of-type{
                            a{
                                background-position-y: -184px;
                            }
                        }
                        &:last-of-type {
                            a {
                                background-position-y: -126px;
                            }
                        }
                    }
                }
                &:last-of-type {
                    li {
                        &:first-of-type{
                            a{
                                background-position-y: -93px;
                            }
                        }
                        &:last-of-type {
                            a {
                                background-position-y: 2px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
