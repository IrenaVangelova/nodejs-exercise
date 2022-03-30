function deleteFaculty(id) {
    fetch('http://localhost:3000/faculties/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text())
      .then(res => {
        location.reload();
      })
  }

  function deleteUniversity(id) {
    fetch('http://localhost:3000/universities/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text())
      .then(res => {
        location.reload();
      })
  }