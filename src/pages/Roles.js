import React, { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'react-toastify';
import AuthorizePostRequest from '../api/authorizePostRequest';
import AuthorizeGetRequest from "../api/authorizeGetRequest";
import AuthorizeDeleteRequest from '../api/authorizedDeleteRequest';
import AuthorizePatchRequest from '../api/authorizedPatchRequest';
import MaterialTable from 'material-table';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve(user);
        }, 200),
      ),
    [],
  );
};
export default function Roles() {
  const mutateRow = useFakeMutation();
    const [Role, setRole] = useState('');
    const [Rolelist, setRolelist] = useState([])
    const [Roleedit, setRoleedit] = useState([])
    const [EditTitle, setEditTitle] = useState('')
    const [EditDescription, setEditDescription] = useState('')
    const [Editid, setEditid] = useState('')
    const [Roleerr, setRoleerr] = useState(false)
    const [descerr, setdescerr] = useState(false)
    const [description, setdescription] = useState('')
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
    const  RolesTitles = [];

    const handleCellEditCommit = React.useCallback(
      async (params) => {
        try {
          // Make the HTTP request to save in the backend
          AuthorizePatchRequest(`api/roles/${params.id}`, {
            [params.field]:params.value    })
          .then((response) => {
            if (response.status === 200){
                toast.success('Successfully Edited Role ', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
                
              } else {
                toast.error("Oops Contact Admin", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setRolelist((prev) => [...prev]);
              }
          })
          const newRole = await mutateRow({
            id: params.id,
            [params.field]: params.value,
          });
          setRolelist((prev) =>
            prev.map((row) => (row.id === params.id ? { ...row, ...newRole } : row)),
          );
          
        } catch (error) {
          // setSnackbar({ children: 'Error while saving user', severity: 'error' });
          // Restore the row in case of error
          
        }
      },
      [mutateRow],
    );
  
    const onChangeRole = (e)=>{
        setRole(e.target.value);

    }
    const onChangeDescrpition = (e)=>{
        setdescription(e.target.value);
    }
    const onChangeEditTitle = (e) =>{
        setEditTitle(e.target.value)
    }
    
    const onChangeEditDescription = (e) =>{
        setEditDescription(e.target.value)
    }
    const onSubmitRole = () =>{
       
        
        if( Role === ''){
            setRoleerr(true)
        }
         if( description === ''){
            setdescerr(true)
        }
        else{
            setloading(true)
            setRoleerr(false)
            setdescerr(false)
            AuthorizePostRequest('api/roles', {
                role_name: Role,
                description ,
              })
              .then((response) => {
                if (response.status === 201){
                    toast.success('Successfully Added New Role ', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setloading(false)
                    setRole('');
                    setdescription('');
                    AuthorizeGetRequest('api/roles').then((response)=>{
                        if(response.status === 200){
                            console.log(response.data);
                            response.data.data.forEach((element) => {
                                const title = {
                                  id: element.id,
                                  RoleName: element.role_name,
                                  Description: element.Description,
                                };
                                RolesTitles.push(title);
                              });
                              setRolelist(RolesTitles)
                            
                        }
                        
                    });
                  } else {
                    toast.error("Oops Contact Admin", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                  }
              })
              .catch((error)=>{
                  console.log(error.message)
                  console.log(error.errors)
              })
        }
      
    }
    const onSubmitEditRole= (e) =>{
        if(EditTitle === ''){
            setRoleerr(true)
        }
         if(EditDescription === ''){
            setdescerr(true)
        }
        else{
            setloading2(true)
            setRoleerr(false)
            setdescerr(false)
            AuthorizePatchRequest(`api/roles/${Editid}`, {
                role_name: EditTitle,
                description: EditDescription ,
              })
              .then((response) => {
                if (response.status === 200){
                    toast.success('Successfully Edited Role ', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setloading2(false)
                    setRole('');
                    setdescription('');
                    AuthorizeGetRequest('api/roles').then((response)=>{
                        if(response.status === 200){
                            console.log(response.data);
                            response.data.data.forEach((element) => {
                                const title = {
                                  id: element.id,
                                  RoleName: element.role_name,
                                  Description: element.Description,
                                };
                                RolesTitles.push(title);
                              });
                              setRolelist(RolesTitles)
                            
                        }
                        
                    });
                  } else {
                    toast.error("Oops Contact Admin", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                  }
              })
              .catch((error)=>{
                  console.log(error)
              })
        }
        e.preventDefault()

    }
    const onEditRole = (id) =>{
        // setEditTitle('')
        // setEditDescription('')
        // setEditid('')
        AuthorizeGetRequest(`api/roles/${id}`).then((response)=>{
            if(response.status === 200){
                console.log(response.data);
                  setEditTitle(response.data.data.role_name)
                  setEditDescription(response.data.data.Description)
                  setEditid(response.data.data.id)
                //   setRoleedit(RolesTitles)
                
            }
            
        });
    }
    const handleSelectionChange = (selection) => {
      setSelectedRows(selection.rows);
      console.log(selection.rows);
    };
  
    const handlePurge = () => {
      setDeletedRows([
        ...deletedRows,
        ...Rolelist.filter(
          (r) => selectedRows.filter((sr) => sr.id === r.id).length < 1
        )
      ]);
      // setRows(selectedRows);
      // setPurgeMode(false);
    };
    const columns = [
      { field: 'role_name', headerName: 'Role Name', width: 170,editable: true },
      { field: 'description', headerName: 'Role Description', width: 400,editable: true },
    ];
    function MultipleActions() {
      return (
        <MaterialTable
          title="Multiple Actions Preview"
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
              title: 'Birth Place',
              field: 'birthCity',
              lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
          ]}
          data={[
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          ]}        
          actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) => alert("You want to delete " + rowData.name)
            }
          ]}
        />
      )
    }
    useEffect(() => {
        AuthorizeGetRequest('api/roles').then((response)=>{
            if(response.status === 200){
                console.log(response.data.data);

                // response.data.data.forEach((element) => {
                //     const title = {
                //       id: element.id,
                //       RoleName: element.role_name,
                //       Description: element.Description,
                //     };
                //     RolesTitles.push(title);
                //   });
                  
                  setRolelist(response.data.data)
                
            }
            
        });
       
    }, []);
    return (
        <div>


    <Card lg={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Add New Roles
        </Typography>
        <form>
        <Typography variant="h5" component="div">
          
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
          
          <TextField id="standard-basic" helperText={Roleerr?'This field is required.':''} error={Roleerr? '1':''} label="Role Name" value={Role} onChange={onChangeRole}  variant="standard" />
        <TextField id="standard-basic" helperText={descerr?'This field is required.':''} error={descerr? '1':''} label="Role Description" value={description} onChange={onChangeDescrpition} variant="standard" />
        {loading ? (
            <LoadingButton
  loading
  loadingPosition="start"
  startIcon={<SaveIcon />}
  variant="outlined"
>
  Save
</LoadingButton>
        ):(<> <Button variant="contained" color="success" onClick={() => {
    onSubmitRole();
  }} endIcon={<SaveIcon />}>
  Save 
</Button></>) }
        

       
      </Box>
        </Typography>
        </form>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"/>
        
        <Typography variant="body2">
          
          <br />
        </Typography>
      </CardContent>
      <CardActions />
    </Card>
    <div style={{ height: 400, width: '100%',marginTop:'30px' }}>
      <DataGrid
        rows={Rolelist}
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
        editMode="row"
      />
    </div>
        </div>
    )
}

