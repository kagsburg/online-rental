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
      role:'Admin',
    },
    {
      id: '1',
      dropdown: false,
      title: 'User Roles',
      titleIcon:<GroupIcon />,
      to: '/dashboard/Add_Roles',
      role:'Admin'
    },
    {
      id: '3',
      dropdown: false,
      title: 'Property Types', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property_type',
      role: 'Landlord'
    },
    {
      id: '7',
      dropdown: false,
      title: 'Property Status', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property_status',
      role: 'Landlord'
    },
    {
      id: '5',
      dropdown: false,
      title: 'Properties', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property',
      role: 'Landlord'
    },
    {
      id: '8',
      dropdown: false,
      title: 'Property Units', 
      titleIcon:<MapsHomeWorkIcon />,
      to: '/dashboard/property_units',
      role: 'Landlord'
    },
    {
      id: '4',
      dropdown: false,
      title: 'User',
      titleIcon:<TextFieldsIcon/>,
      to: '/dashboard/Users',
      role:'Admin' 
    },
    {
      id: '6',
      dropdown: false,
      title: 'Leases',
      titleIcon:<TextFieldsIcon/>,
      to: '/dashboard/Lease',
      role:'Landlord' 
    }
    
  ];
  export default nav