import { toast } from 'react-toastify';

export const getUsers = async () => {
    try {
        const response = await fetch("http://localhost:3001")
        const res = await response.json()
        return res
    } catch (error){
        console.log('Error', error);
        
    }
}

export const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/deleteUser/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await response.json()
        toast.success(res.message || "User deleted successfully");

        return res

    } catch (error) {
        console.log(error);
    }
};

export const addUser = async (data) => {
    try{
        const response = await fetch("http://localhost:3001/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    const res = await response.json()
    console.log('posted data', res)
    toast.success(res.message || "User Add successfully");
    return res
    }catch(error){
        console.log('Error', error);
            }
    }

export const updateUser = async (id, newUser) => {
    try {
        const response = await fetch(`http://localhost:3001/updateUser/${id}`, { // mongodb documents id : _id
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const res = await response.json()
        console.log('updated res', res);
        toast.success(res.message || "User update successfully");
        return res

    } catch (error) {
        console.log(error);
    }
}