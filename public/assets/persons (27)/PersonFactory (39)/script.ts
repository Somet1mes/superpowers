function CreatePeople(width, height, number): IWorldObject[]
{
  let people: LostPerson[] = [];
  for (var i = 0; i < number; i++)
    {
      people.push(new LostPerson(width, height));
    }
  
  return people;
}
