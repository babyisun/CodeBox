/*
 * name     : ReactNative下自定义拉刷新组件
 * source   : LetsPullRefresh.js
 * version  : beta 1.0.0
 * depends  : image/arrow.png & loading.png
 * Download : https://github.com/babyisun/CodeBox/tree/master/RN/Plugin
 *
 * author   : North
 * blog     : http://www.itbbb.com
 * github   : https://github.com/babyisun
 * wechat   : ITbeibei
 * email    : babyisun@qq.com
 *
 * create   : 2017/11/14
 * update   : 2017/11/15
 * 
 * example  : <LetsPullRefresh onRefresh={this._onRefresh}
               backgroundColor="white"
               color="#666">
                ...
              </LetsPullRefresh>
 *
 **/
'use strict'

import React, { Component } from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    View,
    PanResponder,
    LayoutAnimation,
    ProgressBarAndroid,
    Dimensions,
    Text,
    AsyncStorage,
    Image,
    Animated,
    Easing
} from 'react-native';

let self;
const CONFIG = {
    /**ref的引用*/
    PULL_REFRESH_LAYOUT: "pullLayout",
    /**屏幕宽度*/
    deviceWidth: Dimensions.get('window').width,
    /**下拉阻力系数*/
    FACTOR: 1.8,
    /**最大下拉高度*/
    MAX_PULL_LENGTH: Dimensions.get('window').height,
    /**Loading的高度*/
    REFRESH_PULL_LENGTH: 50,
    /**动画时长*/
    BACK_TIME: 500,
    /**存储最后刷新时间的Key*/
    REFRESH_LAST_TIME_KEY: "refresh_last",
    /**刷新状态*/
    RefreshStatus: {
        Refresh_NONE: 0,
        Refresh_Drag_Down: 1,
        Refresh_Loading: 2,
        Refresh_Reset: 3,
    },
    /**显示状态*/
    ShowLoadingStatus: {
        SHOW_DOWN: 0,
        SHOW_UP: 1,
        SHOW_LOADING: 2,
    },
    ShowLoadingStatusText: {
        SHOW_DOWN: "下拉刷新",
        SHOW_UP: "释放刷新",
        SHOW_LOADING: "刷新中……",
    },
    /**显示状态*/
    ICON: {
        ARROW: require('./image/arrow.png'),
        LOADING: require('./image/loading.png')
    }
}

export default class LetsPullRefresh extends Component {

    _panResponder: {}

    constructor(props) {
        super(props);
        this.state = {
            currentDistance: 0,
            pullRefreshStatus: CONFIG.RefreshStatus.Refresh_NONE,
            showPullStatus: CONFIG.ShowLoadingStatus.SHOW_DOWN,
            showPullLastTime: 'NONE',
            rotateValue: new Animated.Value(0)
        };
    }

    //可配置属性
    static defaultProps = {
        //默认背景颜色
        backgroundColor: "white",
        //默认文字颜色
        color: "#666"
    }

    //要求成为响应者
    _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }
    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }
    //touch down 开始手势操作。
    _handlePanResponderGrant(e: Object, gestureState: Object) {
    }
    //滑动中
    _handlePanResponderMove(e: Object, gestureState: Object) {
        if (self.state.currentDistance > CONFIG.REFRESH_PULL_LENGTH) {
            if (self.state.showPullStatus === CONFIG.ShowLoadingStatus.SHOW_DOWN) {
                self.setState({
                    showPullStatus: CONFIG.ShowLoadingStatus.SHOW_UP,
                });
            }
        }
        else {
            if (self.state.showPullStatus === CONFIG.ShowLoadingStatus.SHOW_UP) {
                self.setState({
                    showPullStatus: CONFIG.ShowLoadingStatus.SHOW_DOWN,
                });
            }
        }
        if (self.state.pullRefreshStatus === CONFIG.RefreshStatus.Refresh_Loading) {
            self.setState({
                currentDistance: CONFIG.REFRESH_PULL_LENGTH + gestureState.dy / CONFIG.FACTOR,
            });
            self.refs[CONFIG.PULL_REFRESH_LAYOUT].setNativeProps({
                style: {
                    marginTop: self.state.currentDistance,
                }
            });
            return;
        }
        if (gestureState.dy > 0 && self.state.currentDistance < CONFIG.MAX_PULL_LENGTH) {
            self.setState({
                currentDistance: gestureState.dy / CONFIG.FACTOR,
                pullRefreshStatus: CONFIG.RefreshStatus.Refresh_Drag_Down,
            });
            self.refs[CONFIG.PULL_REFRESH_LAYOUT].setNativeProps({
                style: {
                    marginTop: self.state.currentDistance,
                }
            });
        }
        else if (gestureState.dy > 0 && self.state.currentDistance > CONFIG.MAX_PULL_LENGTH) {//则不再往下移动
            self.setState({
                currentDistance: CONFIG.MAX_PULL_LENGTH,
                pullRefreshStatus: CONFIG.RefreshStatus.Refresh_Drag_Down,
            });
            self.refs[CONFIG.PULL_REFRESH_LAYOUT].setNativeProps({
                style: {
                    marginTop: self.state.currentDistance,
                }
            });
        }
    }

    //滑动结束回位
    _handlePanResponderEnd(e: Object, gestureState: Object) {
        if (self.state.currentDistance >= CONFIG.REFRESH_PULL_LENGTH) {
            self.loadingStateHeader(() => {
                self.resetHeader();
                self.stopRefresh();
            });
        } else if (self.state.currentDistance > 0) {
            self.resetHeader();
        }
    }

    loadingStateHeader(callback) {
        // 开始loading动画
        Animated.timing(this.state.rotateValue, {
            toValue: 360,
            duration: 1000,
            easing: Easing.linear
        }).start();
        self.setState({
            pullRefreshStatus: CONFIG.RefreshStatus.Refresh_Loading,
            currentDistance: CONFIG.REFRESH_PULL_LENGTH,
            showPullStatus: CONFIG.ShowLoadingStatus.SHOW_LOADING,
        }, () => {
            if (self.props.onRefresh) {
                self.props.onRefresh();
            }
            if (callback)
                setTimeout(() => {
                    callback();
                }, 1000);
        });
        LayoutAnimation.configureNext({
            duration: CONFIG.BACK_TIME,
            update: {
                type: 'linear',
            }
        });
        self.refs[CONFIG.PULL_REFRESH_LAYOUT].setNativeProps({
            style: {
                marginTop: CONFIG.REFRESH_PULL_LENGTH,
            }
        });
    }

    resetHeader() {
        LayoutAnimation.configureNext({
            duration: CONFIG.BACK_TIME,
            update: {
                type: 'linear',
            }
        });
        self.refs[CONFIG.PULL_REFRESH_LAYOUT].setNativeProps({
            style: {
                marginTop: 0,
            }
        });
        self.setState({
            currentDistance: 0,
            pullRefreshStatus: CONFIG.RefreshStatus.Refresh_Reset,
            showPullStatus: CONFIG.ShowLoadingStatus.SHOW_DOWN,
        });
    }

    addZeroAtFront(count) {
        if (count < 10) {
            count = "0" + count;
        }
        return count;
    }


    getTime() {
        let date = new Date();

        let mMonth = this.addZeroAtFront(date.getMonth() + 1);

        let mDate = this.addZeroAtFront(date.getDate());

        let mHours = this.addZeroAtFront(date.getHours());

        let mMinutes = this.addZeroAtFront(date.getMinutes());

        return mMonth + "-" + mDate + "  " + mHours + ":" + mMinutes;
    }

    stopRefresh() {
        let savedDate = this.getTime();
        self.setState({
            showPullLastTime: savedDate,
        });
        AsyncStorage.setItem(CONFIG.REFRESH_LAST_TIME_KEY, savedDate);
    }

    componentDidMount() {
        AsyncStorage.getItem(CONFIG.REFRESH_LAST_TIME_KEY, (err, result) => {
            if (result) {
                self.setState({
                    showPullLastTime: result,
                });
            }
        });
    }

    componentWillMount() {
        self = this;
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.showPullStatus !== self.state.showPullStatus) {
            return true;
        }
        if (self.state.showPullLastTime !== nextState.showPullLastTime) {
            return true;
        }
        return false;
    }

    render() {
        let pullText;
        let indicatorView;
        if (this.state.showPullStatus === CONFIG.ShowLoadingStatus.SHOW_DOWN) {
            indicatorView = <Image
                style={styles.iconArea}
                source={CONFIG.ICON.ARROW}
                resizeMode={Image.resizeMode.contain}
            />;
            pullText = CONFIG.ShowLoadingStatusText.SHOW_DOWN;
        }
        else if (this.state.showPullStatus === CONFIG.ShowLoadingStatus.SHOW_UP) {
            indicatorView = <Image
                style={[styles.iconArea, styles.arrowDown]}
                source={CONFIG.ICON.ARROW}
                resizeMode={Image.resizeMode.contain}
            />;
            pullText = CONFIG.ShowLoadingStatusText.SHOW_UP;
        }
        else if (this.state.showPullStatus === CONFIG.ShowLoadingStatus.SHOW_LOADING) {
            //indicatorView = <ProgressBarAndroid style={styles.arrow} />
            indicatorView = <Animated.Image
                style={[styles.iconArea,
                {
                    transform: [{
                        rotate: this.state.rotateValue.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg']
                        })
                    }]
                }]}
                source={CONFIG.ICON.LOADING}
                resizeMode={Image.resizeMode.contain} />
            pullText = CONFIG.ShowLoadingStatusText.SHOW_LOADING;
        }
        const { backgroundColor, color } = this.props;
        return (
            <View style={styles.base}>
                <View ref={CONFIG.PULL_REFRESH_LAYOUT}
                    {...this._panResponder.panHandlers} >
                    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                        <View style={styles.area}>
                            {indicatorView}
                            <View style={styles.main}>
                                <Text style={[styles.font, { marginTop: 2, marginBottom: 2, color: color }]}>{pullText}</Text>
                                <Text style={[styles.font, { marginTop: 2 , color: color}]}>最后更新:   {this.state.showPullLastTime}</Text>
                            </View>
                        </View>
                    </View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        marginTop: -CONFIG.REFRESH_PULL_LENGTH,
    },
    area: {
        justifyContent: 'center', alignItems: 'center',
        width: CONFIG.deviceWidth, height: CONFIG.REFRESH_PULL_LENGTH, flexDirection: 'row'
    },
    main: {
        height: CONFIG.REFRESH_PULL_LENGTH, justifyContent: 'center',
        alignItems: 'center', marginLeft: 10
    },
    font: {
        fontSize: 12, color: '#666'
    },
    iconArea: {
        height: 30, width: 30, marginRight: 10, marginLeft: -30
    },
    arrowDown: {
        transform: [{ rotate: "180deg" }]
    }
});