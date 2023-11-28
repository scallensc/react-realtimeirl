import globalStore from '@store/globalStore';
import flagStore from '@store/flagStore';

const handleTheme = () => {
  const { theme } = flagStore.get();
  const themes = {
    'mapbox-dark': 'mapbox://styles/mapbox/dark-v11',
    'mapbox-japan': 'mapbox://styles/mapbox-map-design/ckt20wgoy1awp17ms7pyygigf',
    'mapbox-light': 'mapbox://styles/mapbox/light-v11',
    'mapbox-navigation-day': 'mapbox://styles/mapbox/navigation-day-v1',
    'mapbox-navigation-night': 'mapbox://styles/mapbox/navigation-night-v1',
    'mapbox-outdoors': 'mapbox://styles/mapbox/outdoors-v12',
    'mapbox-satellite': 'mapbox://styles/mapbox/satellite-v9',
    'mapbox-satellite-streets': 'mapbox://styles/mapbox/satellite-streets-v12',
    'mapbox-streets': 'mapbox://styles/mapbox/streets-v12',
    'basic': 'mapbox://styles/mapbox-map-design/cl4whef7m000714pc44f3qaxs',
    'basic-overcast': 'mapbox://styles/mapbox-map-design/cl4whev1w002w16s9mgoliotw',
    'blueprint': 'mapbox://styles/mapbox-map-design/cks97e1e37nsd17nzg7p0308g',
    'frank': 'mapbox://styles/mapbox-map-design/ckshxkppe0gge18nz20i0nrwq',
    'minimo': 'mapbox://styles/mapbox-map-design/cksjc2nsq1bg117pnekb655h1',
    'standard-oil': 'mapbox://styles/mapbox-map-design/ckr0svm3922ki18qntevm857n',
    'unicorn': 'mapbox://styles/mapbox-map-design/cl4fotjdi000l15p8cqc6nuts',
    'marvel-thanos': 'mapbox://styles/chichan5224/cliwp31hh00et01pw2tjkcy1v',
    'marvel-hulk': 'mapbox://styles/chichan5224/cliwn3a8i00n901r1a4pvhjzq',
    'marvel-blackwidow': 'mapbox://styles/chichan5224/cliwp11uq00ou01r8h6rn1d9k',
    'marvel-ironman': 'mapbox://styles/chichan5224/cliwp57bs00nb01r12nny2y62',
    'marvel-blackpanther': 'mapbox://styles/chichan5224/cliwp490b00eu01pw4zl12i4g',
    'marvel-drstrange': 'mapbox://styles/chichan5224/cliwp5ege00f201pz5acwhz4e',
    'marvel-americachaves': 'mapbox://styles/chichan5224/cliwp7bea00p501q12fl17tac',
    'marvel-captainamerica': 'mapbox://styles/chichan5224/cliwp56zg00ot01od7fpvek1d',
    'marvel-wanda': 'mapbox://styles/chichan5224/cliwp7dg700f301pzd3rzhfyk',
  }
  const defaultTheme = 'mapbox://styles/mapbox/streets-v12';
  const themeUrl = themes[theme] || defaultTheme;
  return globalStore.set((prevState) => ({
    ...prevState,
    theme: themeUrl
  }));
};

handleTheme();