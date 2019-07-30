package be.mytcc.scipio.controller.communistSplit;

import be.mytcc.scipio.model.common.User;
import be.mytcc.scipio.model.common.UserRepository;
import be.mytcc.scipio.model.communistSplit.CommunistSplitGroup;
import be.mytcc.scipio.model.communistSplit.CommunistSplitGroupRepository;
import be.mytcc.scipio.model.communistSplit.CommunistSplitPayment;
import be.mytcc.scipio.model.communistSplit.CommunistSplitPaymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communist-split")
public class CommunistSplitController {

    private Logger logger = LoggerFactory.getLogger(CommunistSplitController.class);

    @Autowired
    private CommunistSplitPaymentRepository communistSplitPaymentRepository;

    @Autowired
    private CommunistSplitGroupRepository communistSplitGroupRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{groupId}/payments")
    public List<CommunistSplitPayment> getAllPayments(@PathVariable long groupId) {
        return communistSplitPaymentRepository.findAllBySplitGroupId(groupId);
    }

    @GetMapping("/groups")
    public List<CommunistSplitGroup> getAllGroups(@RequestAttribute("user") User user) {
        return communistSplitGroupRepository.findByUsers_keycloakId(user.getKeycloakId());
    }

    @PostMapping("/payments")
    public CommunistSplitPayment createNewPayment(@RequestBody CommunistSplitPayment communistSplitPayment){
        return communistSplitPaymentRepository.save(communistSplitPayment);
    }

    @GetMapping("/{groupId}/users")
    public List<User> getAllUsersInGroup(@PathVariable long groupId){
        return userRepository.findUserByCommunistSplitGroups_id(groupId);
    }

}
