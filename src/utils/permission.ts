/* eslint-disable prettier/prettier */
export const permissionArr = [
  {
    id: 'CAMERA',
    title: 'Suvidha App Camera Permission',
    message: 'Suvidha App needs access to your camera.',
    neutralText: 'Ask Me Later',
    negativeText: 'Cancel',
    positiveText: 'OK',
  },
  {
    id: 'RECORD_AUDIO',
    title: 'Suvidha App Record Audio Permission',
    message: 'Suvidha App needs access to your audio system.',
    neutralText: 'Ask Me Later',
    negativeText: 'Cancel',
    positiveText: 'OK',
  },
  {
    id: 'READ_EXTERNAL_STORAGE',
    title: 'Suvidha App Read External Storage Permission',
    message: 'Suvidha App needs read access to your external storage. ',
    neutralText: 'Ask Me Later',
    negativeText: 'Cancel',
    positiveText: 'OK',
  },
  {
    id: 'WRITE_EXTERNAL_STORAGE',
    title: 'Suvidha App Write External Storage Permission',
    message: 'Suvidha App needs write access to your external storage.',
    neutralText: 'Ask Me Later',
    negativeText: 'Cancel',
    positiveText: 'OK',
  },
  // {
  //   id: 'ACCESS_FINE_LOCATION',
  //   title: 'Suvidha App Access Fine Location Permission',
  //   message: 'Suvidha App needs access to find your location.',
  //   neutralText: 'Ask Me Later',
  //   negativeText: 'Cancel',
  //   positiveText: 'OK',
  // },
];

export const redirectToPermission = {
  "locationPermissionRequest": "<ul><li><b>Step 1:</b> Long Press on app icon</li>	<li><b>Step 2:</b> Click on App Permission</li><li><b>Step 3:</b> Click on Location permission option</li><li><b>Step 4:</b> Select 'Ask every time' options</li> </ul>"
}
