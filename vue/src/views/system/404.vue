<template>
    <div class="error404">
        <div class="error404-body-con">
            <Card>
                <div class="error404-body-con-title">4<span><Icon type="ios-navigate-outline"></Icon></span>4</div>
                <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
            </Card>
        </div>
    </div>
</template>
<style lang="less" scoped>
@keyframes error404animation {
    0% {
        transform: rotateZ(0deg);
    }
    20% {
        transform: rotateZ(-60deg);
    }
    40% {
        transform: rotateZ(-10deg);
    }
    60% {
        transform: rotateZ(50deg);
    }
    80% {
        transform: rotateZ(-20deg);
    }
    100% {
        transform: rotateZ(0deg);
    }
}
.error404{
    &-body-con{
        &-title{
            text-align: center;
            font-size: 207px;
            font-weight: 700;
            color: #2d8cf0;
            height: 250px;
            line-height: 260px;
            margin-top: 40px;
            span{
                display: inline-block;
                color: #19be6b;
                font-size: 200px;
                animation: error404animation 3s ease 0s infinite alternate;
            }
        }
        &-message{
            display: block;
            text-align: center;
            font-size: 30px;
            font-weight: 500;
            letter-spacing: 12px;
            color: #dddde2;
        }
    }
    &-btn-con{
        text-align: center;
        padding: 20px 0;
        margin-bottom: 40px;
    }
}
</style>