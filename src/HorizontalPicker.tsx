// https://twitter.com/jevakallio/status/941258932529614848

import React, {PureComponent} from 'react';
import styled from 'styled-components/native';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  height: 40px;
`;

const ItemWrapper = styled(TouchableOpacity)<{width: number}>`
  background-color: transparent;
  width: ${p => p.width}px;
  height: ${p => p.width}px;
  align-items: center;
  justify-content: center;
`;

type Props<T> = {
  onItemSelected: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  items: T[];
  initialItem: T;
  firstIndex: number;
  lastIndex: number;
  itemWidth: number;
  visibleItemCount: number;
};

export default class HorizontalPicker<T> extends PureComponent<Props<T>> {
  carouselRef: CarouselStatic<T> | null = null;

  static defaultProps = {
    itemWidth: 60,
    visibleItemCount: 5,
  };

  moveToItem = (index: number) => {
    if (this.carouselRef) {
      this.carouselRef.snapToItem(index);
    }
  };

  onSnapToItem = (index: number) => {
    if (index >= this.props.lastIndex) {
      this.moveToItem(this.props.lastIndex - 1);
    } else {
      this.props.onItemSelected(this.props.items[index]);
    }
  };

  renderItem = ({item, index}: {item: T; index: number}) => {
    return (
      <ItemWrapper
        width={this.props.itemWidth}
        onPress={
          index <= this.props.lastIndex
            ? () => this.moveToItem(index)
            : undefined
        }>
        {this.props.renderItem(item)}
      </ItemWrapper>
    );
  };

  getItemLayout = (data: T, index: number) => {
    return {length: this.props.itemWidth * index, offset: index, index};
  };

  render() {
    const {items, initialItem, itemWidth, visibleItemCount} = this.props;
    return (
      <Container>
        <Carousel<T>
          ref={ref => {
            this.carouselRef = ref;
          }}
          decelerationRate={0.9}
          enableMomentum={true}
          activeSlideOffset={10}
          data={items}
          // @ts-ignore
          getItemLayout={this.getItemLayout}
          initialScrollIndex={items.indexOf(initialItem)}
          firstItem={items.indexOf(initialItem)}
          renderItem={this.renderItem}
          onSnapToItem={this.onSnapToItem}
          sliderWidth={visibleItemCount * itemWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.7}
          inactiveSlideOpacity={0.5}
        />
      </Container>
    );
  }
}
