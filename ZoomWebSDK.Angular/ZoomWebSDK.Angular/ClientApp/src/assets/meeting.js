//import { ZoomMtg } from ‘@zoomus/websdk‘;

const API_KEY = 'mPBKwnt9RyypYEK-x1FR6g';
const API_SECRET = 'QOYQtD8awHXLO2FztjfgnHFgVSgUJDZEdZQR';
const MEETING_NUMBER = '7610161172';
const MEETING_PASSWORD = 'jVPwA1';

var participantUsername = '';
var participantEmail = '';

function getFrameParams() {
    var params = location.href.split('?')[1].split('&');
    data = {};
    for (i = 0; i < params.length; i++) {
        data[params[i].split('=')[0]] = params[i].split('=')[1];
    }

    alert(decodeURI(data['u']) + '    ' + decodeURI(data['e']));

    meetingConfig.userName = decodeURI(data['u']);
    meetingConfig.userEmail = decodeURI(data['e']);
}

function beginJoin(mc) {
    ZoomMtg.init({
        leaveUrl: mc.leaveUrl,
        disableCORP: !window.crossOriginIsolated, // default true
        // disablePreview: false, // default false
        success: function () {
            console.log(mc);
            console.log("signature", mc.signature);
            ZoomMtg.i18n.load(mc.lang);
            ZoomMtg.i18n.reload(mc.lang);
            ZoomMtg.join({
                meetingNumber: mc.meetingNumber,
                userName: mc.userName,
                signature: mc.signature,
                apiKey: mc.apiKey,
                userEmail: mc.userEmail,
                passWord: mc.passWord,
                success: function (res) {
                    console.log("join meeting success");
                    console.log("get attendeelist");
                    ZoomMtg.getAttendeeslist({});
                    ZoomMtg.getCurrentUser({
                        success: function (res) {
                            console.log("success getCurrentUser", res.result.currentUser);
                        },
                    });
                },
                error: function (res) {
                    console.log(res);
                },
            });
        },
        error: function (res) {
            console.log(res);
        },
    });

    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
        console.log('inMeetingServiceListener onUserJoin', data);
    });

    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
        console.log('inMeetingServiceListener onUserLeave', data);
    });

    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
        console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
    });

    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
        console.log('inMeetingServiceListener onMeetingStatus', data);
    });

}


// For Local module default:
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.5/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const zoomMeeting = document.getElementById("zmmtg-root");

//meeting config
const meetingConfig = {
    apiKey: API_KEY,
    meetingNumber: MEETING_NUMBER,
    userName: 'TESTER',
    passWord: MEETING_PASSWORD,
    leaveUrl: "/assets/blaank.html",
    role: 0,
    userEmail: '',
    lang: 'en-US',
    signature: '',
    china: false,
};

getFrameParams();
//generate signature
const signature = ZoomMtg.generateSignature({
    meetingNumber: MEETING_NUMBER,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: 0,
    success: function (res) {
        console.log(res.result);
        meetingConfig.signature = res.result;

        beginJoin(meetingConfig);
    },
});


