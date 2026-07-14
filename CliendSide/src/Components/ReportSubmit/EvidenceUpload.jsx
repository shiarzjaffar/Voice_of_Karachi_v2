import React from "react";
import styles from "./EvidenceUpload.module.css";

const EvidenceUpload = ({ formData, setFormData }) => {

    const handleFiles = (e) => {

        const files = Array.from(e.target.files);

        if (files.length > 10) {
            alert("Maximum 10 images allowed.");
            return;
        }

        setFormData({
            ...formData,
            photos: files,
        });

    };

    const removeImage = (index) => {

        const updated = [...formData.photos];

        updated.splice(index,1);

        setFormData({
            ...formData,
            photos: updated,
        });

    };

    return (

        <div className={styles.card}>

            <div className={styles.cardHeader}>

                <h2>📷 Evidence</h2>

                <p>

                    Upload clear photos of the issue to help the department verify and resolve it faster.

                </p>

            </div>

            <label className={styles.uploadBox}>

                <div className={styles.uploadIcon}>📷</div>

                <h3>Upload Images</h3>

                <p>

                    Drag & Drop or click here to browse.

                </p>

                <small>

                    Maximum 10 Images

                </small>

                <input

                    type="file"

                    multiple

                    accept="image/*"

                    onChange={handleFiles}

                    hidden

                />

            </label>

            {formData.photos.length > 0 && (

                <div className={styles.previewGrid}>

                    {formData.photos.map((image,index)=>(

                        <div
                            key={index}
                            className={styles.previewCard}
                        >

                            <img

                                src={URL.createObjectURL(image)}

                                alt="Preview"

                            />

                            <button

                                type="button"

                                onClick={()=>removeImage(index)}

                            >

                                ✕
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default EvidenceUpload;