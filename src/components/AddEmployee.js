import React, { useState } from 'react';
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddEmployee(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [img, setImg] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <button onClick={handleShow} 
              className="block mx-auto m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
              + Add Employee
        </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit = {
          (e)=>{
            handleClose();  // close teh modal
            e.preventDefault();//prevent page from refreash 
            props.addEmployee(name, role, img);
            setName('');
            setRole('');
            setImg('');

          }
        } id = "editEmployeeForm" className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                    Full Name
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="name" 
                placeholder="Erkang Xia"
                type="text" 
                value= {name}
                onChange = {(e)=>{
                  setName(e.target.value);
                }}

                
                />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="role">
                    Role
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="role" 
                placeholder="Role"
                type="text" 
                value={role}
                onChange = {(e)=>{
                  setRole(e.target.value);
                }}
                />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="img">
                    Image
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="img" 
                placeholder="https:"
                type="text" 
                value={img}
                onChange = {(e)=>{
                  setImg(e.target.value);
                }}
                />
                </div>
            </div>

        </form>
        </Modal.Body>
        <Modal.Footer>
            <button form = "editEmployeeForm" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                Add
            </button>
            <button onClick={handleClose} class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
                Close
            </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;
