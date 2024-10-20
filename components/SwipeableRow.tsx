import { ThemeColours } from "@/models/ThemeColours";
import React, { Component, PropsWithChildren } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

interface Props {
  colours: ThemeColours;
  handleView: () => void;
  handleDelete: () => void;
}

export default class SwipeableRow extends Component<PropsWithChildren<Props>> {
  private renderRightAction = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [33, 0],
    });

    return (
      <Animated.View
        style={{
          width: 100,
          borderRadius: 12,
          paddingVertical: 6,
          transform: [{ translateX: trans }],
        }}
      >
        <RectButton
          style={[
            styles.rightAction,
            { backgroundColor: this.props.colours.accentButton },
          ]}
          onPress={this.props.handleDelete}
        >
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private renderLeftAction = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [33, 0],
    });

    return (
      <Animated.View
        style={{
          width: 100,
          borderRadius: 12,
          paddingVertical: 8,
          transform: [{ translateX: trans }],
        }}
      >
        <RectButton
          style={[
            styles.rightAction,
            { backgroundColor: this.props.colours.primary },
          ]}
          onPress={this.props.handleView}
        >
          <Text style={styles.actionText}>View</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };

  private close = () => {
    this.swipeableRow?.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={this.renderLeftAction}
        renderRightActions={this.renderRightAction}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
