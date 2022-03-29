import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import GroupIcon from '@mui/icons-material/Group';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const nav = [
    
    {
      id: '2',
      dropdown: true,
      title: 'Landlords',
      titleIcon:<AssessmentIcon />,
      dropdownItems: [
        {
          id: '1',
          dropdown: false,
          titleIcon:'',
          title: 'View LandLord',
          to: '/',
        },
        {
          id: '2',
          dropdown: false,
          titleIcon:'',
          title: 'Add LandLord',
          to: '/program/ongoing',
        },
       
      ],
    },
    {
      id: '1',
      dropdown: false,
      title: 'User Roles',
      titleIcon:<GroupIcon />,
      to: '/dashboard/Add_Roles'
    },
    {
      id: '3',
      dropdown: false,
      title: 'Property Types', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property_type',
    },
    {
      id: '5',
      dropdown: false,
      title: 'Property Status', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property_status',
    },
    {
      id: '5',
      dropdown: false,
      title: 'Properties', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property',
    },
    {
      id: '4',
      dropdown: false,
      title: 'User',
      titleIcon:<TextFieldsIcon/>,
      to: '/dashboard/Users',
    },
    
  ];
  export default nav