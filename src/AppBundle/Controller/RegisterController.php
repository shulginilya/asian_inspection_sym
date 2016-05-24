<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Entity\User;

class RegisterController extends Controller
{
    /**
     * @Route("/register", name="register")
     */
    public function indexAction(Request $request)
    {
      return $this->render('auth/register.html.twig', array(
          'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..'),
      ));
    }

    /**
     * @Route("/register/user", name="register_user")
     */
    public function registerAction(Request $request)
    {
      $res_data = array(
        'status' => false
      );
      $user_data = $request->request->all();
      $user = new User();
      $user->setFname($user_data['fname']);
      $user->setLname($user_data['lname']);
      $user->setCompany($user_data['company']);
      $user->setEmail($user_data['email']);
      $user->setCountry($user_data['country']);
      $user->setPhone($user_data['phone']);
      $user->setUsername($user_data['username']);
      $user->setPsw($user_data['psw']);
      try {
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        $res_data['status'] = true;
        $res_data['msg'] = 'User is successfully created';
      } catch(\Exception $e) {
        $res_data['msg'] = $e->getMessage();
      }

      return new JsonResponse($res_data);
    }
}
