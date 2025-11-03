const express = require('express');
const router = express.Router();
const leadController = require("../controller/leadController");

router.post('/createLead',leadController.createLead);
router.get('/showLeads',leadController.getLeads);
router.put('/:id/updateLead',leadController.updateLeadStatus);
router.delete("/:id/deleteLead", leadController.deleteLead);
module.exports = router;