
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { useEffect, useState, useRef } from "react";
const width = Dimensions.get("window").width - 20;
let currentSlideIndex = 0;




export default function Slider({ data, title, onSlidePress }) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActivelideIndex] = useState(0);

  

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatList = useRef();

  
  const SliderIndicators = ({ data, activeSlideIndex }) => 
    
      data.map((item, index) => {
        return (
          <View
            key={item.id}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 2,
              marginLeft: 4,
              backgroundColor:
                activeSlideIndex === index ? "#88BEFD" : "transparent",
                borderColor:"#88BEFD",
            }}
          />
        );
      });
    
      const handleScrollTo = (index) => {
        flatList.current.scrollToIndex({ animated: false, index });
      };

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    const length = dataToRender.length;

    if (visibleSlideIndex === length - 1 && length) handleScrollTo(1);

    if (visibleSlideIndex === 0 && length) handleScrollTo(length - 2);

    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;

    if (lastSlide && length) setActivelideIndex(0);
    else if (firstSlide && length) setActivelideIndex(length - 2);
    else setActivelideIndex(currentSlideIndex - 1);
  }, [visibleSlideIndex]);

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => onSlidePress(item)}>
      <View>
        <Image
          source={{ uri: item.thumbnail }}
          style={{ width, height: width / 1.7, borderRadius: 5 }}
          />
        <View style={{ width }}>
          <Text
            numberOfLines={2}
            style={{ fontWeight: "700", color:"#323232", fontSize: 22 }}
            >
            {item.title}
          </Text>
        </View>
      </View>
            
    </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom:10 ,
        }}
      >
        <Text style={{ fontWeight: "700", color: "#323232", fontSize: 22 }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SliderIndicators data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        horizontal
        viewabilityConfig={viewabilityConfig.current}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItem}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
    
  },
});
