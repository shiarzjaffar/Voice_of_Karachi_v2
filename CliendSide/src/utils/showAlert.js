import Swal from "sweetalert2";

export const showAlert = (options) => {

    return Swal.fire({

        background:"#FFFFFF",

        color:"#111827",

        confirmButtonColor:"#006A4E",

        cancelButtonColor:"#DC2626",

        reverseButtons:true,

        ...options,

    });

};