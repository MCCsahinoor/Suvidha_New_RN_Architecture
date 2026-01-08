import React, { lazy, memo, Suspense, useState } from 'react'; 
import HomeQuickLinks from './HomeQuickLinks';
import { Colors } from '../../themes'; 
import { useTranslation } from 'react-i18next'; 
import HomeTutoaials from './HomeTutoaials';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import CustomTabBar from '../../components/CustomTabBar';
import HomeBenefit from './HomeBenefit';
// const HomeBenefit = lazy(() => import('./HomeBenefit'));

// const SuspenseWrapper = (Component: any) => (props: any) => (
//   <React.Suspense fallback={<DynamicShimmerPlaceholder borderRadius={5} height={100} width={'100%'} count={5} />}>
//     <Component {...props} />
//   </React.Suspense>
// );

function HomeTabsTop({ navigation }: any) {
  const { t } = useTranslation();

  const [selectedSwitchValue, setSelectedSwitchValue] = useState('business');

  return (
    <>
      <CustomTabBar
        defaultTrue={false}
        onPress={(value: string) => {
          setSelectedSwitchValue(value);
        }}
        boxheight={35}
        fontSize={12}
        disabled={false}
        options={[
          { title: t("Business"), value: 'business' },
          { title: t("quickLinks"), value: 'quickLinks' },
          { title: t("tutorials"), value: 'tutorials' },
        ]}
        selectedValue={selectedSwitchValue}
        bgColor={Colors.color_white}
        selectedItemBgColor={Colors.ui_dark_bg}
        selectedItemTextColor={Colors.color_white}
        otherItemTextColor={Colors.ui_light_bg}
      />
      {selectedSwitchValue === 'business' && <HomeBenefit />}
      {selectedSwitchValue === 'quickLinks' && <HomeQuickLinks navigation={navigation} />}
      {selectedSwitchValue === 'tutorials' && <HomeTutoaials />}
    </>
  );
}

export default memo(HomeTabsTop);