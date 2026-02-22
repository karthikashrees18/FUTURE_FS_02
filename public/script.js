document.addEventListener('DOMContentLoaded', fetchLeads);

// 1. Handle Form Submission (Add Lead)
document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const leadData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        source: document.getElementById('source').value
    };

    const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
    });

    if (response.ok) {
        document.getElementById('leadForm').reset();
        fetchLeads(); // Refresh the list
    }
});

// 2. Fetch and Display Leads (Updated with Delete Button)
async function fetchLeads() {
    const response = await fetch('/api/leads');
    const leads = await response.json();
    
    const tableBody = document.getElementById('leadsTableBody');
    tableBody.innerHTML = ''; 

    leads.forEach(lead => {
        const row = `
            <tr>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.source || 'N/A'}</td>
                <td>
                    <select onchange="updateStatus('${lead._id}', this.value)">
                        <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
                        <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="Converted" ${lead.status === 'Converted' ? 'selected' : ''}>Converted</option>
                    </select>
                </td>
                <td>${new Date(lead.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="delete-btn" onclick="deleteLead('${lead._id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 3. Update Status (The PUT request)
async function updateStatus(id, newStatus) {
    await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
    fetchLeads();
}

// 4. Function to delete a lead (The DELETE request)
async function deleteLead(id) {
    if (confirm("Are you sure you want to delete this lead?")) {
        try {
            const response = await fetch(`/api/leads/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log("Lead deleted");
                fetchLeads(); // Refresh the table
            } else {
                alert("Failed to delete the lead.");
            }
        } catch (error) {
            console.error("Error deleting lead:", error);
        }
    }
}