package be.mytcc.scipio.controller.bdo;

import be.mytcc.scipio.model.bdo.Hunt;
import be.mytcc.scipio.model.bdo.HuntRepository;
import be.mytcc.scipio.model.bdo.Monster;
import be.mytcc.scipio.model.bdo.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hunt")
public class HuntController {

    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private HuntRepository huntRepository;

    @GetMapping("/monsters")
    public List<Monster> getAllMonsters() {
        return monsterRepository.findAll();
    }

    @PatchMapping("/monsters")
    public Monster patchMonster(@RequestBody Monster monster){
        return monsterRepository.save(monster);
    }

    @PostMapping("/monsters")
    public Monster createMonster(@RequestBody Monster monster){
        return monsterRepository.save(monster);
    }

    @DeleteMapping("/monsters/{id}")
    public void deleteMonster(@PathVariable("id") long id){
        monsterRepository.delete(new Monster(id, null, 0));
    }

    @GetMapping("/hunts")
    public List<Hunt> getAllHunts(){
        return huntRepository.findAll();
    }

}
