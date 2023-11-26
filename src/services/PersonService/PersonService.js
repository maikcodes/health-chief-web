const mockPersonList = [
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas asd'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  },
  {
    idCard: '2300848807',
    firstName: 'willy maykros',
    lastName: 'romero naula',
    occupation: 'software engineer',
    maritalStatus: 's',
    nationality: 'ec',
    gender: 'm',
    phoneNumber: '0997046643',
    address: 'Street 1 and 2',
    birthDate: '1999-12-24',
    birthPlace: 'Santo Domingo tsachilas'
  }
]

function mapPerson (person) {
  return {
    idCard: person.idCard || null,
    firstName: person.firstName || null,
    lastName: person.lastName || null,
    occupation: person.occupation || null,
    maritalStatus: person.maritalStatus || null,
    nationality: person.nationality || null,
    gender: person.gender || null,
    phoneNumber: person.phoneNumber || null,
    address: person.address || null,
    birthDate: person.birthDate || null,
    birthPlace: person.birthPlace || null
  }
}

function mapper (personList) {
  const mappedPersonList = personList.map(person => mapPerson(person))
  return mappedPersonList
}

export class PersonService {
  static async getAll () {
    const personList = mockPersonList
    const mappedPersonList = mapper(personList)
    return mappedPersonList
  }

  static async getById (id) {
    const person = mockPersonList[0]
    return person
  }
}
