import axios from "axios";

export default {

  saveMail(mailData) {
    return axios.post("/api/mail", mailData);
  },
  getSavedMails(taskId) {
    return axios.get(`/api/mail/${taskId}`);
  },
};
