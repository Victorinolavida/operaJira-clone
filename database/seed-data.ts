

interface SeedEntry{
  description:string;
  status:string;
  createdAt:number;
}

interface SeedData{
  entries:SeedEntry[]
}


export const seedData:SeedData = {
  entries:[
    {
      description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem',
      status:'pending',
      createdAt:Date.now()+10000
    },
    {
      description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem',
      status:'finished',
      createdAt:Date.now()-10000
    },
    {
      description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem',
      status:'in-progress',
      createdAt:Date.now()
    }
  ]
}