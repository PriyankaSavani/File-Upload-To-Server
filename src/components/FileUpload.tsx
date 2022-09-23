import { useState } from "react";
import { Button, Card } from "react-bootstrap";

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState<any>()
    const [selectedMultiFile, setSelectedMultiFile] = useState<any>()

    const handleSingleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0])
    }

    const handleMultiFileChange = (e: any) => {
        setSelectedMultiFile(e.target.files)
    }

    console.log('selectedMultiFile', selectedMultiFile);


    // single file
    const handleSingleSubmit = () => {
        let formData = new FormData()

        formData.append('avatar', selectedFile);
        fetch(
            'http://192.168.1.144:9499/upload-avatar',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => { console.log('Success:', result); })
            .catch((error) => { console.error('Error:', error); })

    }

    // multi file
    const handleMultiSubmit = () => {
        let formData = new FormData()

        for(let files of selectedMultiFile) {
            formData.append('photos', files);
        }        

        fetch(
            'http://192.168.1.144:9499/upload-photos',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => { console.log('Success:', result); })
            .catch((error) => { console.error('Error:', error); })

    }

    return (
        <>
            <Card className="mb-4">
                <Card.Body>
                    <label className="form-label">Select Single File: </label>
                    <input
                        type='file'
                        onChange={handleSingleFileChange}
                        className='form-control mb-3'
                    />
                    {selectedFile ? (
                        <div>
                            <p><b>Filename :</b> {selectedFile.name}</p>
                            <p><b>Filetype :</b> {selectedFile.type}</p>
                            <p><b>Size in bytes :</b> {selectedFile.size}</p>
                            <p><b>lastModifiedDate :</b> {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                    <div className="mt-3">
                        <Button onClick={handleSingleSubmit}>Submit</Button>
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <label className="form-label">Select Multi File: </label>
                    <input
                        type='file'
                        onChange={handleMultiFileChange}
                        multiple
                        className='form-control mb-3'
                    />
                    {/* {selectedMultiFile ? (
                        <div>
                            <p><b>Filename :</b> {selectedMultiFile.name}</p>
                            <p><b>Filetype :</b> {selectedMultiFile.type}</p>
                            <p><b>Size in bytes :</b> {selectedMultiFile.size}</p>
                            <p><b>lastModifiedDate :</b> {selectedMultiFile.lastModifiedDate.toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )} */}
                    <div className="mt-3">
                        <Button onClick={handleMultiSubmit}>Submit</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default FileUpload