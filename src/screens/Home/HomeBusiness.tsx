import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'; 
import styles from './styles'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from '../../themes'; 
import HeaderCurve from '../../components/HeaderCurve';
import {Dropdown} from 'react-native-element-dropdown';
import Card from '../../components/Card';

const HomeBusiness = ({navigation}: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'MTD', value: 'MTD'},
    {label: 'QTD', value: 'QTD'},
    {label: 'HTD', value: 'HTD'},
    {label: 'YTD', value: 'YTD'},
  ]);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <ScrollView style={{backgroundColor: '#F2F2F2'}}>
        <View style={{...styles.container}}>
          <View style={{...styles.rangeSelect}}>
            <Text style={{color: Colors.color_gray, marginRight: 5}}>
              Show:
            </Text>
            {/* <DropDownPicker  
                    style={{ 
                      minHeight: 30, 
                      borderColor: Colors.color_gray
                    }} 
                    loading={loading} 
                    containerStyle={{width: 91}}
                    placeholder="Select"
                    placeholderStyle={{
                      color: Colors.color_gray, 
                    }} 
                    dropDownContainerStyle={{ borderColor: Colors.color_gray }}
                    open={open}
                    value={value}
                    zIndex={99}
                    items={items}
                    closeOnBackPressed={true}
                    listMode = "SCROLLVIEW"
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    modalTitleStyle={{
                      fontWeight: "bold"
                    }}
                  />  */}
            <View style={{width: 80}}>
              <Dropdown
                style={{
                  minHeight: 30,
                  borderWidth: 1,
                  borderColor: Colors.color_gray,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 5,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={items}
                // mode="modal"
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : 'Select'}
                searchPlaceholder="Search..."
                value={value}
                itemContainerStyle={styles.itemContainerInnerStyle}
                flatListProps={{
                  contentContainerStyle: styles.itemContainerStyle,
                }}
                itemTextStyle={{fontSize: 14}}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
          <View style={{padding: 10, zIndex: -1}}>
            <View style={{marginBottom: 10}}>
              <Card>
                <View
                  style={{
                    padding: 10,
                    paddingVertical: 15,
                    ...styles.business,
                  }}>
                  <View style={{...styles.business}}>
                    <Image
                      source={require('../../assets/images/lif&win.png')}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 8,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 16, ...styles.BusinessHeader}}>
                        Points Earned
                      </Text>
                      <Text style={{fontSize: 16, ...styles.BusinessSubHeader}}>
                        Volume lifted
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{fontSize: 16, ...styles.BusinessHeader}}>
                      320
                    </Text>
                    <Text style={{fontSize: 16, ...styles.BusinessSubHeader}}>
                      320 <Text style={styles.subscriptText}>Ltr+Kg</Text>
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
            <View style={{marginBottom: 10}}>
              <Card>
                <View
                  style={{
                    padding: 10,
                    paddingVertical: 15,
                    ...styles.business,
                  }}>
                  <View style={{...styles.business}}>
                    <Image
                      source={require('../../assets/images/xp-logo.png')}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 8,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 16, ...styles.BusinessHeader}}>
                        XP Leads
                      </Text>
                      <Text style={{fontSize: 12, ...styles.BusinessSubHeader}}>
                        No of leads
                      </Text>
                    </View>
                  </View>
                  <View>
                    <LinearGradient
                      colors={['#F28DF1', '#4E61B6']}
                      style={styles.countBG}>
                      <Text style={{fontSize: 16, ...styles.NumberIndicater}}>
                        5
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              </Card>
            </View>
            <View style={{marginBottom: 10}}>
              <Card>
                <View
                  style={{
                    padding: 10,
                    paddingVertical: 15,
                    ...styles.business,
                  }}>
                  <View style={{...styles.business}}>
                    <Image
                      source={require('../../assets/images/esambhand.png')}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 8,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 16, ...styles.BusinessHeader}}>
                        eSambandh
                      </Text>
                      <Text style={{fontSize: 12, ...styles.BusinessSubHeader}}>
                        Business value
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{fontSize: 16, ...styles.BusinessProgress}}>
                      <FontAwesome name="caret-up" size={16} />
                      +1.02%
                    </Text>
                    <Text style={{fontSize: 16, ...styles.BusinessSubHeader}}>
                      ₹2,500.5
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
            <View style={{marginBottom: 10}}>
              <Card>
                <View
                  style={{
                    padding: 10,
                    paddingVertical: 15,
                    ...styles.business,
                  }}>
                  <View style={{...styles.business}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 16, ...styles.BusinessHeader}}>
                        XP Tools
                      </Text>
                      <Text style={{fontSize: 12, ...styles.BusinessSubHeader}}>
                        Express Painting Tools
                      </Text>
                    </View>
                  </View>
                  <View>
                    <LinearGradient
                      colors={['#F28DF1', '#4E61B6']}
                      style={styles.countBG}>
                      <Text style={{fontSize: 16, ...styles.NumberIndicater}}>
                        5
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              </Card>
            </View>
          </View> 
        </View>
      </ScrollView>
    </>
  );
};

export default HomeBusiness;
