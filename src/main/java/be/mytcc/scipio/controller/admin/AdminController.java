package be.mytcc.scipio.controller.admin;

import be.mytcc.scipio.model.common.User;
import be.mytcc.scipio.model.common.UserRepository;
import be.mytcc.scipio.model.communistSplit.CommunistSplitGroup;
import be.mytcc.scipio.model.communistSplit.CommunistSplitGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommunistSplitGroupRepository communistSplitGroupRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PatchMapping("/users")
    public User patchUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @GetMapping("/communist-split/groups")
    public List<CommunistSplitGroup> getAllCommunistSplitGroups(){
        return communistSplitGroupRepository.findAll();
    }

    @PostMapping("/communist-split/groups")
    public CommunistSplitGroup createNewCommunistSplitGroup(@RequestBody CommunistSplitGroup communistSplitGroup){
        return communistSplitGroupRepository.save(communistSplitGroup);
    }

    @PatchMapping("/communist-split/groups")
    public CommunistSplitGroup patchCommunistSplitGroup(@RequestBody CommunistSplitGroup communistSplitGroup){
        return communistSplitGroupRepository.save(communistSplitGroup);
    }
}
