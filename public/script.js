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

// 2. Fetch and Display Leads
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